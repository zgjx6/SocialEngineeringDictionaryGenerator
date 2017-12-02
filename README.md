# SocialEngineeringDictionaryGenerator

## 简介
社会工程学密码生成器，是一个利用个人信息生成密码的工具，灵感源于亦思社会工程学字典生成器，但是该软件多年未更新，且生成的密码过少，故根据起构思重新做了一个。

它根据输入的个人信息，生成多种人们可能使用的密码组合，组合共分三阶。其中一阶密码是指仅根据一项个人信息生成的密码；二阶密码是指根据两项个人信息生成的密码；三阶密码是指根据三项个人信息生成的密码，并且包括常用的连接符号（如：@）和常用的字符（如：abc）。

除了社会工程学密码以外，还包含了一些常用的弱密码，两者结合可以大幅提高密码破解概率。

## 网址
[社会工程学密码生成器](http://xingchen.pythonanywhere.com)

## 安装
本工具后端使用python的flask框架，前端使用vue和webpack。开发用的python版本为3.6，理论上也支持python2.x，但没有进行过测试。

安装步骤：
1. 安装python。去官网下载安装即可。
2. 下载源码后，在命令行中执行`pip install -r requirements.txt`安装python的依赖库。
3. 在命令行中执行`python build/api.py`后打开浏览器，访问`http://127.0.0.1:5000/`即可。

编译前端：
src目录为前端源码，build目录为编译后的前端代码，如需修改前端代码，可参考如下步骤重新编译。
1.安装nodejs和npm。[下载地址](http://nodejs.cn/)。
2.在项目根目录下执行`npm install` 安装所有的依赖包。
3.执行`npm run build`重新打包。另外，在开发过程中执行`npm run watch`可实时编译。


## 开源协议
[MIT License.](https://opensource.org/licenses/MIT)