---
title: ProxmoxVE Config
date: 2021-10-09 15:46:10
tags: [ Proxmox ]
category: Proxmox
---
## PVE7.0国内源 ProxmoxVE
先安装vim编辑器，后面会使用。

```Bash
apt install vim
```

***默认是企业订阅版，如果不做修改，在使用 pveceph init 进行 ceph 初始化安装的时候会将整个环境破坏，切记***

下面的直接复制到终端运行即可

```Bash
echo "#deb https://enterprise.proxmox.com/debian/pve bullseye pve-enterprise" > /etc/apt/sources.list.d/pve-enterprise.list
```

```Bash
wget https://mirrors.ustc.edu.cn/proxmox/debian/proxmox-release-bullseye.gpg -O /etc/apt/trusted.gpg.d/proxmox-release-bullseye.gpg
echo "deb https://mirrors.ustc.edu.cn/proxmox/debian/pve bullseye pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list
echo "deb https://mirrors.ustc.edu.cn/proxmox/debian/ceph-pacific bullseye main" > /etc/apt/sources.list.d/ceph.list
sed -i.bak "s#http://download.proxmox.com/debian#https://mirrors.ustc.edu.cn/proxmox/debian#g" /usr/share/perl5/PVE/CLI/pveceph.pm
```

```Bash
tee /etc/apt/sources.list << EOF
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
EOF
```

最后记得更新源

```Bash
apt-get update && apt-get upgrade && apt-get dist-upgrade -y
```

## Proxmox VE 内核

安装 pvekclean

```Bash
apt update && apt -y install git && rm -rf ./pvekclean/ && git clone https://hub.fastgit.org/jordanhillis/pvekclean.git && cd pvekclean && chmod +x pvekclean.sh && ./pvekclean.sh
```
或
```Bash
apt update && apt -y install git && rm -rf ./pvekclean/ && git clone https://github.com/jordanhillis/pvekclean.git && cd pvekclean && chmod +x pvekclean.sh && ./pvekclean.sh
```

运行 pvekclean执行删除

```Bash
pvekclean -f
```

调整服务器时间(调整后PVE联网几分钟会自动更新时间)

```Bash
tee /etc/systemd/timesyncd.conf << EOF
[Time]
NTP=ntp1.cn.ntp.org.cn ntp2.cn.pool.ntp.org
EOF
```