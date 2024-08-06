`git config`

`git config` 命令可以针对不同做的作用域进行配置(局部，全局，系统)。

- 系统： 适用于整个 Git 系统， 包括系统上的所有用户和所有仓库， 配置文件位于 `/etc/gitconfig`
- 全局：当前系统用户所有 Git 仓库，但是不会影响其他用户的配置。 配置文件位于 `~/.gitconfig`
- 局部：当前 Git 仓库，配置文件位于 `./.git/config`

**查看配置信息**

查看全部配置：

查看 git 配置是通过 `--list` 或者 `-l` 选项来操作的， 如果不指定作用域，就会默认显示当前仓库的配置（`--local`）。 也可以指定作用域。 

```bash
# 查看全局 git 配置
git config --global -l

# 查看系统 git 配置
git config --system -l
```

查看单个配置

git 提供了 `--get` 选线用于查看某单个配置字段，且该选线可以被缺省，即:

```bash
git config --get user.name
# 等同于
git config user.name
```



**配置 git 信息**

配置也是通过 `git config` 指定， 例如：
```bash
# 指定当前项目默认编辑器为 vim
git config core.editor vim

# 指定全局git 用户名为 jayce
git config --global user.name "jayce"
```

除此基本配置以外，还有非常多的可配置项， 具体的，可以通过 `man git-config` 指定查看。 