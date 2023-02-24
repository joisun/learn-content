## Authentication

**认证** 是大多数应用程序中非常重要的部分. 有很多不同的方法和策略去处理 **认证**, 根据不同的要求决定。

本章节展示了几种不同方式，这些方式通常是能够适用于大多数情况的。

**Passport** 是node.js 中最流行的 用于认证处理逻辑的 库，在社区范围广为人知，并被应用于很多生产应用。  Next.js 也专门封装了 `@nestjs/passport` module, 用于简单快速的整合 Nestjs 应用。 在较高的层级上来看，Passport 执行了一系列的步骤：

- 通过用户的 “credentials" (例如， 用户名/密码，JSON Web Token( **JWT** ), 或者由认证提供商提供的 identity token 标识token) 的校验来认证一个用户。
-  管理 已经认证的状态 (通过发布一个可移植令牌(如JWT)或创建一个Express会话)。
- 将有关身份验证的用户信息附加到请求对象，以在路由处理程序中进一步使用。

Passport 有着丰富的 策略([strategies](http://www.passportjs.org/) ) 生态，这些策略实现了各种 认证 机制。 你可以根据你的需要选择各种策略， Passport 将上述的这些不同的步骤 抽象为标准的 模式(pattern)，且 `@nestjs/passport` 的作用就是将 这个 模式(pattern) 包装并序列化成更熟悉的 Nest 的结构。

在本章节中，我们将会利用这些强大，灵活的模块，为一个 RESTful API 服务实现一个完整的 end-to-end 认证解决方案。 你可以使用本章中所描述的各种概念去实现任何 Passport 策略以实现自定义你的验证逻辑。 你可以跟着这些步骤去构建这个完整的示例，也可以在这里看到完整的示例代码 [here](https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt).



### Authentication requirements

在这里用例中，客户端将会发送 username 和 password, 一旦认证完成， 这个服务器将会颁发一个 JWT 用以在客户端后续的请求中，作为 [bearer token in an authorization header](https://tools.ietf.org/html/rfc6750)  (请求头中的 bearer token) 携带到服务端，以作为认证成功的凭证。 我们还会创建一个受保护的路由，该路由将只能够被携带 有效 JWT 的请求访问。



我们将会从验证一个用户开始，然后将会扩展实现JWT 颁发，最后我们将会创建一个受保护的路由。



首先，先安装需要的依赖包：

`passport-local`: 实现了一个 username/password 验证机制，很适合我们用例的这一部分需求。

```bash
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```

> :notebook_with_decorative_cover: 对于你所选择的 任何 Passsport 策略，你始终都会需要 `@nestjs/passport` 和 `passport` 这两个包依赖。 然后，你需要安装安装策略对应的包，这些包实现了了特定的认证策略（例如`passport-jwt`, 或者 `passport-local`）。 此外，你也可以为任何 Passport 策略安装类型声明文件 `@types/passport-local` ，这将会提供代码提示。



### 实现 Passport 策略

我们将会先从一个所有 Passport 策略都通用的过程开始。把 Passport 视作一个迷你框架将会比较有帮助。 该框架的优雅之处在于，它将身份验证过程抽象为几个基本步骤，您可以根据所实现的策略自定义这些步骤。它很像一个框架是因为你通过提供自定义的参数（作为 plain JSON 对象）和 Passport 将会在合适时机执行的自定义回调函数进行配置。`@nestjs/passport` module 将这个框架包装包装成为一个 Nest 风格的依赖包，使得他易于整合到 Nest 应用。 我们接下来将会使用 `@nestjs/passport`， 但是在此之前，我们先思考一下 原生 的 Passport 是如何工作的。

在原生 Passport 中， 你可以配置一个策略，通过提供两个东西：

1. 一系列的配置项用于特定的策略，例如，在 JWT策略中，我可能需要提供一个 `secret` 去签名 token
2. 一个 "verify callback"（验证回调）， 这是你用于告诉 Passport 如何和你的 user store(你管理用户账户的地方) 进行通信。 在这里，你将会验证一个用户是否存在，以及他们的 credentials 凭证是否是有效的。 Passport 这个库 **期望** 验证成功时这个回调将返回一个完整的用户（a full user）, 失败则返回 `null` (包括了用户不存在，密码错误)

**通过 `@nestjs/passport` ， 你可以通过 继承 `PassportStrategy` 这个类以配置 Passport 策略。  你可以在你的子类中通过 `super()` 传递 策略配置项（上述item1）， 通过重写 `validate()` 方法提供你自己的 verify callback（上述item2）。**

我们将会从 创建 `AuthModule` ，`AuthService`开始:

```bash
$ nest g module auth
$ nest g service auth
```

当我们实现 `AuthService` 的时候，我们会发现在UsersService中封装用户操作非常有用，所以现在让我们生成该模块和服务：

```bash
$ nest g module users
$ nest g service users
```



将自动生成的内容替换成以下内容。对于我们这个简单的应用， `UserService`简单的维护了一份硬编码的用户列表。 以及一个 find 方法用于 检索到匹配的用户，在实际的应用中。 这里用于和数据库做交互。 

```js

//users/users.service.ts
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```

在 `UserModal` 中，唯一的修改，是需要添加`UserService`   到 `@Module` 修饰器的 exports 数组，这样，就能够在module之外访问到这个 `UserModal` 了。（我们很快就会用到了）

```diff
//users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
+  exports: [UsersService],
})
export class UsersModule {}
```

在我们的 `AuthService` ，我们创建了一个 `validateUser()` 方法以实现 检索匹配用户以及验证密码的功能。 在下方的代码，我们使用了 ES6 的扩展运算符用于从用户对象中剥离密码属性，然后再返回它。 我们稍后将会在 Passport local strtegy 本地策略中去调用这个 `validateUser()`  方法。 

```js
//auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
```

> :warning: 
>
> 当然，在实际的应用中，你不会将密码存储为明文，你或许可以使用一个叫做 bcrypt 的库，它有着单向哈希盐值算法。 通过这种方式，你就可以仅存储哈希计算后的密码。 然后将客户端用户提交上来的密码同样哈希计算后和数据库存储的哈希密码比对以验证正确性。 因此，永远不要存储以及暴露用户的秘密为明文。 为了保持我们用例的简洁性，我们这里直接用明文。 

现在，我们更新我们的 `AuthModule` ，引入`UserModule`

```diff
//auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
+ import { UsersModule } from '../users/users.module';

@Module({
+  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
```

### 实现 Passport local (实现Passport 本地策略)

现在我们可以实现我们 Passport 的本地认证策略了 （local authentication strategy）。创建一个名为 `local.strategy.ts` 的文件在 `auth` 目录下。 并添加如下代码：

```js
//auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

我们遵循了先前为所有 Passport 策略所描述的要素。 在我们的例子中，我们直接使用了 passport-local, 它并没有提供 配置选项（configutaion options）, 所以我们的构造器仅简单的调用`super()`，没有提供配置选项。 

> :notebook_with_decorative_cover: 
>
> 我们前面也说过了，我们可以在继承 PassportStrategy 的LocalStrategy 子类的构造器中，通过调用 `super()` 方法，并向其传递配置选项以自定义Passport 策略的行为。 在这个示例中，passport-local 策略默认期望接受 **请求体(request body)** 中名为 `username` 以及 `password` 的属性。 可以通过传递一个选项对象以指定需要的属性名，例如： `super({usernameField:"email"})`。 需要更多相关信息可以参考 [Passport documentation](http://www.passportjs.org/docs/configure/) 。

我们也实现了 `valiated()` 方法，对于每个策略， Passport 将会以特定的策略所指定的一组参数，将这个方法作为验证函数调用。对于我们这里的 local-strategy, Passport 期望 `validate()` 方法有着这些签名 ：`validate(username:string, password:string):any`。

多数的验证工作在我们的 `AuthService` 中已经完成了（在`UserService`的帮助下，因为我们实际的方法实现是在这里面），所以这个方法是相当的直接了当。 **任何** Passport 策略的  `validate()`  方法都会尊从一个简单的 pattern(模板/模式)， 只是在表示凭据(credentials)的细节上有所不同。如果一个用户匹配到了，并且这个凭据是有效的。 这个用户将会返回，因此 Password 也将完成其工作。请求的Handling 管道流也会继续。如果没有匹配用户，我们将会抛出一个 exception, 并让我们的 exception 曾处理它。

> @jayce: 可以将认证视作门卫，请求就像是送外卖，门卫的作用只是验证小哥身份，验证通过，小哥就会继续工作。 



通常，每个 策略 中的 `validate()` 方法，最显著的不同之处在于，你是如何验证用户是不是存在，以及凭据是否有效。  例如， 在 JWT 策略中，取决于需求，我们可能会计算 解码后的 token 中携带的 `userId`是否能和我们数据库中的用户记录匹配，或者匹配撤销令牌的列表。 因此，这种子类化和实现特定策略验证的模式是一致的、优雅的和可扩展的。



我们需要配置我们的 `AuthModule` 去使用我们刚才定义的 Passport features(功能/能力/特性)。  将 `auth.module.ts` 更新为以下内容：

```diff
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
+ import { PassportModule } from '@nestjs/passport';
+ import { LocalStrategy } from './local.strategy';

@Module({
- imports: [UsersModule],
+ imports: [UsersModule, PassportModule],
- providers: [AuthService],
+ providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```

### 内置的 Passport 守卫（Guards）

[Guards](https://docs.nestjs.com/guards) 章节描述了 Guards 的主要功能： 用于判定一个请求是否能够被 router handler 所处理（handled）, 在本章节中，这仍然是没错的， 我们也很快将会用到这个标准的能力。 不过，在涉及`@nestjs/passport` 的时候， 我们将会介绍一个可能一开始会让人感到困惑的新问题。 因此，让我们现在来讨论一下。 思考一下，你的应用可能会存在两种状态。从一个认证(authentication)的层面来看:

1. 用户没有登入 ( 没有被认证 )
2. 用户登入了 ( 被认证了 )

在第一种情况中，也就是用户没登入时，我们需要执行两个不同的功能：

- 限制未经认证的用户能够直接访问的路由 (这里的路由指的是后端API 的 url path)。 我们将会使用 Guards 实现这个功能。 通过在 需要被保护的 路由上方放置一个 Guard, 如你所料，我们将会在这个守卫中检查 JWT 的有效性存在。 因此，我们稍后将会实现它。  
- 当以前未经身份验证的用户试图登陆的时候，启动身份验证步骤本身。 这一步中，我们将向有效用户颁发 JWT。 想一想，我们知道我们需要一个裹挟着 `username/password` 凭证的 POST 请求去启动认证。 因此我们将会设定一个 `POST /auth/login` 的路由去handle这个请求。 这也引发了一个进一步的问题，我们的passport-local 策略究竟如何被触发 ？

答案是很直接的： 通过使用**另外一个，稍有不同的类型的 Guard**。 `@nestjs/passport` module 提供给我们了一个内置的 Guard 用以帮助我们完成该工作。 该Guard 将会触发 Passport 策略，并开始执行上面描述的步骤 （检查匹配用户账户密码，执行验证函数(verify function)，创建 `user` 属性, 等等）



上面列举的第二种情况(已登录用户) **仅仅依赖于我们已经讨论过的标准Guard类型**，以允许已登录用户访问受保护的路由。



### Login route 登录路由

现在有了 策略 ，我们现在可以实现一个基本的 `/auth/login` 路由，并且应用内置的 Guard 以启动 passport-local 流程。

打开 `app.controller.ts` 这个文件，并且替换为以下内容：

```js
//app.controller.ts
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
```

> 没有`app.controller.ts` 这个文件，那么可以通过 `nest g controller app` 快速生成。

在 `@UseGuards(AuthGuard('local'))` 中，我们使用了 `AuthGuard` , 通过传入一个`"local"` 字符串，他将自动匹配到我们Passport 的 local 策略。它将自动和策略中的代码关联起来。 

为了测试我们的路由，我们现在只需要 `/auth/login` 路由返回用户。 这还可以让我们演示另一个 Passport 特性： Passport 根据 我们从 `validate()` 方法中返回的值， Passport 自动创建一个 `user` 对象，并且将其作为 `req.user` 分配给 `Request` 请求对象。 稍后，我们将会用 创建 JWT 的代码替换它。

可以使用 cURL 命令行工具进行测试：

```bash
$ # POST to /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"userId":1,"username":"john"}
```



虽然，现在这样是可行的，但是，将策略名以字符串的形式直接传递给 `AuthGuard()` 方法会在代码库中引入 魔法字符串(magic strings),  所以，我们建议您创建你自己的类。如下所示：

```js
//auth/local-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

现在，我们可以更新 `/auth/login` 路由 handler , 并使用 `LocalAuthGuard`:

```JS
@UseGuards(LocalAuthGuard)
@Post('auth/login')
async login(@Request() req) {
  return req.user;
}
```

### JWT 功能

我们已经准备好进入我们的授权系统的 JWT 部分了， 让我们回顾并完善一下我们的需求：

- 允许用户使用 username/password 进行身份验证，并返回一个 JWT, 以便在对受保护的 API 端点的后续调用中使用。 为了完成它，我们需要编写发出 JWT 的代码/
- 根据是否存在有效的 JWT 作为持有者令牌，创建受保护的 API 路由。

我们需要再俺扎u那个几个软件包来支持我们的而 JWT 需求：

```bash
$ npm install --save @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt
```

`@nestjs/jwt` 包依赖（更多见 [here](https://github.com/nestjs/jwt)）是一个有助于 JWT 操作的使用程序包。 Passport-jwt 包是实现 JWT 策略的 Passport 包，而 `@types/passport-jwt` 提供了 TypeScript 类型定义。

让我们仔细看看如何处理 `POST /auth/login` 请求，我们已经使用了有 passport-local 策略提供的 内置 AuthGuard 装饰了这条线路。 这意味着:

- 路由 handler 只有在用户已经被验证的时候在会被调用
- `req` 参数将会包含一个 `user` 属性（在passport-local 身份验证流中由 Passport 填充）

考虑到这一点，我们现在终于可以生成一个真正的 JWT, 并在这个路由中返回它。 为了使我的服务保持清晰的模块化，我们将处理在 `authService` 中生成 JWT, 在 auth 目录下，打开 `auth.service.ts` 文件，并添加 `login()` 方法， 然后导入 JwtService ,如下所示：

```diff
//auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
+ import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
- constructor(private usersService: UsersService) {}
+ constructor(
+   private usersService: UsersService,
+   private jwtService: JwtService
+ ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
 
+ async login(user: any) {
+   const payload = { username: user.username, sub: user.userId };
+   return {
+     access_token: this.jwtService.sign(payload),
+   };
  }
}
```

我们使用 `@nestjs/jwt` 库， 它提供了一个 `sign()` 函数来从用户对象属性的子集生成 JWT, 然后我们将它作为一个简单的对象返回， 只有一个 `access_token` 属性。 注意我们选择 `sub` 属性名来保存 `userId` 值，以便与  JWT 标签保持一致。 不要忘记将 JwtService 提供程序注入 AuthService。

现在我们需要更新 `AuthModule`来导入新的依赖项并配置 JwtModule。

首先，在 auth 目录下创建 `Constants.ts` 文件，并添加以下代码：
```js
// auth/constants.ts
export const jwtConstants = {
  secret: 'secretKey',
};
```

我们将使用它在 JWT 签名和验证步骤之间共享密钥。

> :warning:
>
> 不要公开密钥。 我们这里是为了明确代码在做什么。 但是在生产系统中，你必须保护好这个密钥。 使用适当的措施，比如保密库，环境变量或者配置服务。 

现在，打开 `autn/auth.module.ts` ,并如下更新：

```diff
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
+ import { JwtModule } from '@nestjs/jwt';
+ import { jwtConstants } from './constants';

@Module({
- imports: [UsersModule, PassportModule],
+ imports: [
+   UsersModule,
+   PassportModule,
+   JwtModule.register({
+     secret: jwtConstants.secret,
+     signOptions: { expiresIn: '60s' },
+   }),
+ ],
  providers: [AuthService, LocalStrategy],
+ exports: [AuthService],
})
export class AuthModule {}
```

我们使用 `register()` 配置 `JwtModule` ，并传入一个配置对象。有关 Nest `JwtModule` 的详细信息，可以参考 [here](https://github.com/nestjs/jwt/blob/master/README.md) ， 有关可配置选项的详细信息，可以参考[here](https://github.com/auth0/node-jsonwebtoken#usage) 。

现在我们可以更新 `/auth/login` 路由以返回一个 JWT

```DIFF
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
- import { AuthGuard } from '@nestjs/passport';
+ import { LocalAuthGuard } from './auth/local-auth.guard';
+ import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
- @UseGuards(AuthGuard('local'))
+ @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
-   return req.user;
+   return this.authService.login(req.user);
  }
}
```

让我们继续使用 cURL 测试我们的路由：
```bash
$ # POST to /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
$ # Note: above JWT truncated
```

### 实现 Passport JWT 

现在我们可以解决最后一个需求， 通过要求在请求中携带一个有效的 JWT 来保护路由端点的访问。 Passport 在这里也可以帮助我们。 它提供了用于使用 JWT 令牌保护的 RESTful 的 passport-jwt 策略。 首先在 auth 目录下创建一个名为 `jwt.strategy.ts` 的文件。并添加以下代码：

```js
//auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
	
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

在我们的 JwtStrategy 中，我们遵循了前面之前描述的所有规则。 这个策略需要一些初始化，所以我们通过 在 `super()` 调用时传入一个 options 对象来实现。 你可以在 [here](https://github.com/mikenicholson/passport-jwt#configure-strategy) 了解到更多相关信息 ，在我们的案例中， 这些选项是:

- `jwtFromRequest`:  提供了从请求中提取JWT 的方法，在我们的 API 请求中，我们将会使用标准的方式去携带令牌(bearer token) ，也就是在 Authentication header中。
- `ignoreExpiration`: 默认是 false, 它会确保 JWT 未过期，如果请求携带了过期的 jwt, 那么该请求会被拒绝，并返回 401
- `secretOrKey`: 用于jwt 签名的密钥字符串。



这里的 `validate()` 方法值得讨论， 对于 jwt-strategy, Passport 先会验证 JWT 的签名，并且就解析 JSON, 然后会执行我们的 `validate()` 方法，并传入解码后的 JSON 作为其方法参数，根据 JWT 签名的工作方式，我们保证我们会收到以前已经签署并发给有效用户的有效令牌。

由于这些原因，我们对`validate()` 回调的响应非常简单：我们只是返回一个包含 `userId` 和 `username`属性的对象， 再次回想一下 Passport 将基于 `validate()` 方法的返回值构建一个用户兑现个， 并将其作为属性附加到 Request 对象上。

还有一点值得指出的是，这种方法给我们留下了空间（可以说是“钩子”），可以将其他业务逻辑注入到流程中。 例如，我们可以在 `validate()` 方法中执行数据库的查找。已提取关于用户的更多信息，从而在 Request 中提供更丰富的用户对象。 这也是我们可能决定进一步令牌验证的地方，例如在已撤销令牌列表中查找 userid, 使我们能够执行令牌撤销。我们在示例代码啊中实现的模型是一个快速的“无状态JWT”模型，其中每个 api 调用都是基于有效JWT的存在而立即授权的，请求管道中有关请求者（其 userid 和  username ）的一小部分信息。

在 AuthModule 中添加新的 JwtStrategy 作为提供者:

```diff
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
+ import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
-   providers: [AuthService, LocalStrategy],
+   providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

通过导入在签名 JWT 时相同的密钥，我们确保 Passport 执行的验证阶段和 AuthService 中执行的签名阶段使用公共密钥。

最后我们定义了继承内置的 `AuthGuard` 的 `JwtAuthGuard`类：

```js
//auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 实现受保护的路由(protected route) 以及 JWT 策略守卫(JWT strategy guards)

我们现在可以实现我们的保护路由及其相关的警卫。

打开 `app.controller.ts` 文件，并如下更新：

```diff
- import { Controller, Request, Post, UseGuards } from '@nestjs/common';
+ import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
+ import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

+  @UseGuards(JwtAuthGuard)
+  @Get('profile')
+  getProfile(@Request() req) {
+    return req.user;
+  }
}
```

同样，我们正在应用 AuthGuard 时， `@nestjs/passport` 模块自动为我们注入的我们配置的 passport-jwt 模块。 这个守卫Guard 通过其默认名 “jwt” 进行关联引用。 当我们的 `GET /profile` 路由被访问的时候，这个守卫就会自动触发我们的 passport-jwt 自定义配置的验证逻辑， 验证 JWT 的有效性，并且将`user` 属性附加到 `Request` 对象上。

确保应用程序正在运行，并使用 `cURL` 测试路由

```bash
$ # GET /profile
$ curl http://localhost:3000/profile
$ # result -> {"statusCode":401,"message":"Unauthorized"}

$ # POST /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }

$ # GET /profile using access_token returned from previous step as bearer code
$ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
$ # result -> {"userId":1,"username":"john"}
```

注意，在 AuthModule 中，我们将 JWT 配置为过期时间为 60 秒，这个国企时间可能太短， 处理令牌国企和刷新的细节超出了本文的范围，然而，我们选择它是为了展示 JWT 的一个重要特性和 passport-jwt 策略。 如果在进行身份验证 60 秒后才尝试 `GET /profile` 请求，将会受到一个 401未授权响应。 这是因为 Passport 会自动检查 JWT 的过期时间，从而省去了在应用中处理的麻烦。 

我们现在已经完成了 JWT 身份验证实现。  JavaScript 客户端(Angular/ React/ Vue)和其他应用程序现在可以验证身份并与我们的API 服务器安全地通信。

你可以在这里找到代码的完整版本。 [here](https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt).

