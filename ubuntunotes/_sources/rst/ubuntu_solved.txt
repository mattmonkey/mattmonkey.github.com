疑难解决
========

删除软件（usplash）失败
------------------------

1. 找到dpkg数据文件 
   
    ::
   
        gvim /var/lib/dpkg/status

#. mp3转码

    ::

        sudo apt-get install convmv iconv python-mutagen
        find . -iname "*.mp3" -execdir mid3iconv -e GBK {} \;
    


#. 修改相关项目的 **Status** 字段。 [1]_

    ::
    
        Status: purge ok not-installed


修改登录画面（lightdm）
-----------------------

1. 查找配置文件

    ::

        /etc/lightdm/unity-greeter.conf

#. 修改 **background** 项目


用户home目录下的默认目录改成英文
--------------------------------

    ::

        export LANG=en_US 
        xdg-user-dirs-gtk-update 



删除多余的内核
---------------

1. 使用aptitude、synaptic删除多余内核

#. 更新GRUB，查看残留内核并移除 
    
    ::

        sudo update-grub


#. 再更新GRUB

#. 更新BURG(如果安装)

    ::

        sudo update-burg


xterm解决中文问题
------------------
1. 写配置文件

   ::
    
        ! English font
        xterm*faceName: DejaVu Sans Mono:antialias=True:pixelsize=14
        ! Chinese font
        xterm*faceNameDoublesize: WenQuanYi Micro Hei:pixelsize=14


#. 加载配置文件

    ::

        xrdb -load .Xdefaults


|

|


参考文章
--------

.. [1]    `软件包安装、删除出错的终极解决方法！ <http://forum.ubuntu.org.cn/viewtopic.php?f=77&t=213816>`_
