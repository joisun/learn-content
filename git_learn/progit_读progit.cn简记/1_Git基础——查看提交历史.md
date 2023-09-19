[toc]



## `git diff`

`git diff` 如果不加参数， 可以查看尚未暂存的文件更新了哪些部分， `git diff --cached/staged` 则可以查看已暂存的文件中下次提交将包含的变化内容。

## `git commit -am "update"`

 `-a` 选项的作用是将所有 **已追踪** 的 **改动** 文件提交， 省略了 `git add 指定文件` 这一步骤， 但是注意， 它仅提交已经追踪过的文件，也就是曾经执行过 `git add` 的文件， 所以如果是新增的文件，由于没有被 track ，所以还是需要执行`git add`



**示例：`-am` 命令演示** 

<details> <summary>点击展开/折叠代码块</summary>

```bash
jayce@jayce-home:.ignore$ echo "hello git" > hello.js #创建 hello.js 文件
jayce@jayce-home:.ignore$ ls
hello.js
jayce@jayce-home:.ignore$ git add hello.js #让 git 追踪 hello.js 文件
jayce@jayce-home:.ignore$ ls
hello.js
jayce@jayce-home:.ignore$ git status 
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   hello.js #git 检测到新增 的 hello.js 文件

jayce@jayce-home:.ignore$ echo "foo" > foo.js # 新增 foo.js 文件
jayce@jayce-home:.ignore$ echo "some change to hello.js" >> hello.js #同时修改 hello.js 文件
jayce@jayce-home:.ignore$ ls
foo.js  hello.js
jayce@jayce-home:.ignore$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   hello.js #git 现在已经暂存的文件

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   hello.js #git 检测到追踪文件 hello.js 发生了变化， 但是没有被 commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        foo.js        #git 检测 新增文件 foo.js 但是没有被追踪

jayce@jayce-home:.ignore$ git commit -am "changed" #暂存并提交被修改的 已追踪 文件
[master 7d4b90f] changed
 1 file changed, 2 insertions(+)
 create mode 100644 hello.js
jayce@jayce-home:.ignore$ git status 
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        foo.js # 注意，由于 foo.js 没有被追踪， 所以 git commit -am "change" 没有提交 foo.js 

nothing added to commit but untracked files present (use "git add" to track)
```

</details>



## `git status -s` or `git status --short`

`git status` 命令的输出十分详细，但其用语有些繁琐。 如果你使用 `git status -s` 命令或 `git status --short` 命令，你将得到一种更为紧凑的格式输出。



## `git rm`

有时候我们希望放弃对某个文件的追踪， 这时候就可以使用 `git rm` 命令， 但是针对几种不同的情况，使用上也会存在区别。 

**删除某个已经提交过的文件，并下一次不再追踪**

```bash
jayce@jayce-home:.ignore$ ls
jayce@jayce-home:.ignore$ echo "foo" > foo.js
jayce@jayce-home:.ignore$ git add foo.js
jayce@jayce-home:.ignore$ git commit -m "add foo.js"
[master f7d41cc] add foo.js
 2 files changed, 1 insertion(+), 2 deletions(-)
 create mode 100644 foo.js
 delete mode 100644 hello.js
jayce@jayce-home:.ignore$ git status
On branch master
nothing to commit, working tree clean

jayce@jayce-home:.ignore$ ls
foo.js

# 上面新增了 foo.js ，并提交了
# 但是如果我现在想要删除foo.js 文件， 并且希望下一次不在追踪 foo.js 文件， 就可以这么做：
jayce@jayce-home:.ignore$ git rm foo.js
rm 'foo.js'
jayce@jayce-home:.ignore$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    foo.js

jayce@jayce-home:.ignore$
```

**修改了某个已经追踪的文件，但是想要删除**

```bash
jayce@jayce-home:.ignore$ ls
foo.js
jayce@jayce-home:.ignore$ git status
On branch master
nothing to commit, working tree clean
jayce@jayce-home:.ignore$ echo "new line" >> foo.js
jayce@jayce-home:.ignore$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   foo.js #修改了已追踪的文件，但是修改的部分没有通过 git add 暂存

no changes added to commit (use "git add" and/or "git commit -a")

# 又或者执行了 git add 进行了暂存 ↓
jayce@jayce-home:.ignore$ git add foo.js
jayce@jayce-home:.ignore$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   foo.js
        
# 这时候需要通过指定 `-f` 选项强制删除
jayce@jayce-home:.ignore$ git rm -f foo.js
rm 'foo.js'
jayce@jayce-home:.ignore$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    foo.js

jayce@jayce-home:.ignore$ git commit -m "delete foo.js"
[master ede52d6] delete foo.js
 1 file changed, 1 deletion(-)
 delete mode 100644 foo.js
jayce@jayce-home:.ignore$ git status
On branch master
nothing to commit, working tree clean
```

另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。 当你忘记添加 `.gitignore` 文件，不小心把一个很大的日志文件或一堆 `.a` 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目的，使用 `--cached` 选项：

```console
$ git rm --cached README
```

`git rm` 命令后面可以列出文件或者目录的名字，也可以使用 `glob` 模式。 比方说：

```console
$ git rm log/\*.log
```

注意到星号 `*` 之前的反斜杠 `\`， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。 此命令删除 `log/` 目录下扩展名为 `.log` 的所有文件。 类似的比如：

```console
$ git rm \*~
```

该命令为删除以 `~` 结尾的所有文件。





## `git log`

`git log` 命令用于查看 commit 记录，又很多选项可以按需使用。 

- `-n` : 如果我们想要查看最近两次的提交记录， 那么就可以如下指定

  ```bash
  git log -2
  ```

- `-p`: 该选项将会显示每次提交的详细修改情况

- `--stat`: 该选项会列出每次提交中哪些文件修改了，是新增行还是删除行，新增了多少，删除了多少。

- `--pretty`: 该选项是一个非常有用的选项，可以定制的输出提交日志。可以指定为 `oneline`, `short`, `full`, `fuller`, 分别对应日志信息不同细粒度的展示

  ```bash
  ## 示例
  # oneline
  $ git log --pretty=oneline -4
  a83be14e4dc09b627940163a4bae00e1e9e79e6c (HEAD -> master, origin/master, origin/HEAD) fix: 文件预览组件，下载失败
  efc5559c768fa4076c990f3ca25382ef17d724c7 feat: 文件预览 组件
  575c8c453a21bb59e21a122b3238f7835cdb052a chore: update gitignore
  dcd2a798d591ffcdd15c478843b16d711cd539af chore: build 添加 /api
  # short
  $ git log --pretty=short -1
  commit a83be14e4dc09b627940163a4bae00e1e9e79e6c (HEAD -> master, origin/master, origin/HEAD)
  Author: jayce <jaycethanks@outlook.com>
  
    fix: 文件预览组件，下载失败
  # full
  $ git log --pretty=full -1
  commit a83be14e4dc09b627940163a4bae00e1e9e79e6c (HEAD -> master, origin/master, origin/HEAD)
  Author: jayce <jaycethanks@outlook.com>
  Commit: jayce <jaycethanks@outlook.com> #多了commit
  
    fix: 文件预览组件，下载失败
  # fuller
  $ git log --pretty=fuller -1
  commit a83be14e4dc09b627940163a4bae00e1e9e79e6c (HEAD -> master, origin/master, origin/HEAD)
  Author:     jayce <jaycethanks@outlook.com>
  AuthorDate: Fri Jun 30 15:00:23 2023 +0800
  Commit:     jayce <jaycethanks@outlook.com>
  CommitDate: Fri Jun 30 15:00:23 2023 +0800
  
    fix: 文件预览组件，下载失败
  ```


- `--pretty=format:xxx`: 该命令要比 预设的 展示规则强大的多， 可以更加自由的按照自己需要的规则展示日志

  ```bash
  ## 示例
  $ git log --pretty=format:"%h - %an, %ar : %s" -4
  a83be14 - jayce, 3 months ago : fix: 文件预览组件，下载失败
  efc5559 - jayce, 3 months ago : feat: 文件预览 组件
  575c8c4 - jayce, 3 months ago : chore: update gitignore
  dcd2a79 - jayce, 3 months ago : chore: build 添加 /api
  ```
  
    <details> <summary>点击展开更多 format 规则</summary>
  
  | 选项  | 说明                                        |
  | :---- | :------------------------------------------ |
  | `%H`  | 提交对象（commit）的完整哈希字串            |
  | `%h`  | 提交对象的简短哈希字串                      |
  | `%T`  | 树对象（tree）的完整哈希字串                |
  | `%t`  | 树对象的简短哈希字串                        |
  | `%P`  | 父对象（parent）的完整哈希字串              |
  | `%p`  | 父对象的简短哈希字串                        |
  | `%an` | 作者（author）的名字                        |
  | `%ae` | 作者的电子邮件地址                          |
  | `%ad` | 作者修订日期（可以用 --date= 选项定制格式） |
  | `%ar` | 作者修订日期，按多久以前的方式显示          |
  | `%cn` | 提交者（committer）的名字                   |
  | `%ce` | 提交者的电子邮件地址                        |
  | `%cd` | 提交日期                                    |
  | `%cr` | 提交日期，按多久以前的方式显示              |
  | `%s`  | 提交说明                                    |
  
    </details>



## `git log --pretty=format:"%h %s" --graph`

当 oneline 或 format 与另一个 `log` 选项 `--graph` 结合使用时尤其有用。 这个选项添加了一些ASCII字符串来形象地展示你的分支、合并历史：



以上只是简单介绍了一些 `git log` 命令支持的选项。 [`git log` 的常用选项](https://www.progit.cn/#log_options) 列出了我们目前涉及到的和没涉及到的选项，以及它们是如何影响 log 命令的输出的：

| 选项              | 说明                                                         |
| :---------------- | :----------------------------------------------------------- |
| `-p`              | 按补丁格式显示每个更新之间的差异。                           |
| `--stat`          | 显示每次更新的文件修改统计信息。                             |
| `--shortstat`     | 只显示 --stat 中最后的行数修改添加移除统计。                 |
| `--name-only`     | 仅在提交信息后显示已修改的文件清单。                         |
| `--name-status`   | 显示新增、修改、删除的文件清单。                             |
| `--abbrev-commit` | 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。            |
| `--relative-date` | 使用较短的相对时间显示（比如，“2 weeks ago”）。              |
| `--graph`         | 显示 ASCII 图形表示的分支合并历史。                          |
| `--pretty`        | 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式）。 |

**限制输出长度**

除了定制输出格式的选项之外，`git log` 还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息。

除了定制输出格式的选项之外，`git log` 还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息。 之前你已经看到过 `-2` 了，它只显示最近的两条提交， 实际上，这是 `-<n>` 选项的写法，其中的 `n` 可以是任何整数，表示仅显示最近的若干条提交。 不过实践中我们是不太用这个选项的，Git 在输出所有提交时会自动调用分页程序，所以你一次只会看到一页的内容。

另外还有按照时间作限制的选项，比如 `--since` 和 `--until` 也很有用。 例如，下面的命令列出所有最近两周内的提交：

```console
$ git log --since=2.weeks
```

这个命令可以在多种格式下工作，比如说具体的某一天 `"2008-01-15"`，或者是相对地多久以前 `"2 years 1 day 3 minutes ago"`。

还可以给出若干搜索条件，列出符合的提交。 用 `--author` 选项显示指定作者的提交，用 `--grep` 选项搜索提交说明中的关键字。 （请注意，如果要得到同时满足这两个选项搜索条件的提交，就必须用 `--all-match` 选项。否则，满足任意一个条件的提交都会被匹配出来）

另一个非常有用的筛选选项是 `-S`，可以列出那些添加或移除了某些字符串的提交。 比如说，你想找出添加或移除了某一个特定函数的引用的提交，你可以这样使用：

```console
$ git log -Sfunction_name
```

最后一个很实用的 `git log` 选项是路径（path）， 如果只关心某些文件或者目录的历史提交，可以在 git log 选项的最后指定它们的路径。 因为是放在最后位置上的选项，所以用两个短划线（--）隔开之前的选项和后面限定的路径名。

在 [限制 `git log` 输出的选项](https://www.progit.cn/#limit_options) 中列出了常用的选项

| 选项                  | 说明                               |
| :-------------------- | :--------------------------------- |
| `-(n)`                | 仅显示最近的 n 条提交              |
| `--since`, `--after`  | 仅显示指定时间之后的提交。         |
| `--until`, `--before` | 仅显示指定时间之前的提交。         |
| `--author`            | 仅显示指定作者相关的提交。         |
| `--committer`         | 仅显示指定提交者相关的提交。       |
| `--grep`              | 仅显示含指定关键字的提交           |
| `-S`                  | 仅显示添加或移除了某个关键字的提交 |

来看一个实际的例子，如果要查看 Git 仓库中，2008 年 10 月期间，Junio Hamano 提交的但未合并的测试文件，可以用下面的查询命令：

```console
$ git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
   --before="2008-11-01" --no-merges -- t/
5610e3b - Fix testcase failure when extended attributes are in use
acd3b9e - Enhance hold_lock_file_for_{update,append}() API
f563754 - demonstrate breakage of detached checkout with symbolic link HEAD
d1a43f2 - reset --hard/read-tree --reset -u: remove unmerged new paths
51a94af - Fix "checkout --track -b newbranch" on detached HEAD
b0ad11e - pull: allow "git pull origin $something:$current_branch" into an unborn branch
```

在近 40000 条提交中，上面的输出仅列出了符合条件的 6 条记录。







## `git commit --amend`

在任何一个阶段，你都有可能想要撤消某些操作。 这里，我们将会学习几个撤消你所做修改的基本工具。 注意，有些撤消操作是不可逆的。 这是在使用 Git 的过程中，会因为操作失误而导致之前的工作丢失的少有的几个地方之一。

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 `--amend` 选项的提交命令尝试重新提交：

```console
$ git commit --amend
```

这个命令会将暂存区中的文件提交。 如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。

文本编辑器启动后，可以看到之前的提交信息。 编辑后保存会覆盖原来的提交信息。

例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```console
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

最终你只会有一个提交 - 第二次提交将代替第一次提交的结果。
