---
title: Kubernetes install
date: 2022-03-22 15:04:03
tags: [ Kubernetes ]
category: Kubernetes
---
## 部署方式介绍

kubeadm是官方社区推出的一个用于快速部署kubernetes集群的工具，这个工具能通过两条指令完成一个Kubernetes集群的部署：

1. 创建一个Master节点 `kubeadm init`
2. 将Node节点加入到当前集群中 `kubeadm join <Master 节点的IP和端口>`

## 环境初始化

### 关闭swap交换分区
_防止Docker安装容器时安装到swap分区_

临时关闭

```Bash
swapoff -a
```

永久关闭

```Bash
vim /etc/fstab
# 注释掉最后一行的swap
```

### 开启ip转发

```Bash
vim /etc/sysctl.conf
# 开启net.ipv4.ip_forward 
net.ipv4.ip_forward=1
```

查看状态

```Bash
sysctl -p
```

## 安装Docker

### 使用官方安装脚本自动安装
```Bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
### 修改Dockers驱动
_避免和kubelet和docker的驱动程序不一致 导致kubelet启动失败_
```Bash
vim /etc/docker/daemon.json
# 添加配置
{
 "exec-opts":["native.cgroupdriver=systemd"]
}
```
重启Docker
```Bash
systemctl restart docker
```

## 安装k8s
### 添加阿里云证书
```Bash
curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add - 
```
### 添加阿里云apt源
```Bash
cat << EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF  
```
### 更新源
```Bash
apt update
```
### 查看可kubelet安装版本
```Bash
apt-cache madison kubelet
```
### 安装kubelet
```Bash
# 安装最新版本
apt install -y kubelet kubeadm kubectl
# 安装制定版本
apt install -y kubelet=1.18.4-00 kubeadm=1.18.4-00 kubectl=1.18.4-00
```
### 启动kubelet
```Bash
systemctl start kubelet
# 设置开机自启
systemctl enable kubelet 
# 查看状态
systemctl status kubelet 
```
### 查看安装所需镜像
```Bash
kubeadm config images list
# 指定版本号
kubeadm config images list --kubernetes-version=v1.18.4
```
### 从阿里云下载镜像
_kubeadm 默认镜像源地址为Google源 科学上网请忽略_
```Bash
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.18.4
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.18.4
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.18.4
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.18.4
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.2
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.7
```
### 为镜像重新打tag
_科学上网请忽略_
```Bash
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.18.4 k8s.gcr.io/kube-apiserver:v1.18.4
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.18.4 k8s.gcr.io/kube-controller-manager:v1.18.4
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.18.4 k8s.gcr.io/kube-scheduler:v1.18.4
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.18.4 k8s.gcr.io/kube-proxy:v1.18.4
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.2 k8s.gcr.io/pause:3.2
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0 k8s.gcr.io/etcd:3.4.3-0
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.7 k8s.gcr.io/coredns:1.6.7
```
### 初始化master节点
```Bash
kubeadm init --kubernetes-version=v1.18.4 --pod-network-cidr=10.244.0.0/16 --ignore-preflight-errors=Swap
# kubernetes-version kubernetes版本号 跟安装的kubeadm保持一致
# pod-network-cidr pod网段 
# ignore-preflight-errors 忽略运行的错误
# 其他选项可以通过kubeadm init --help查看
```
### 重置master
```Bash
kubeadm reset
```
### 添加网络组件
```Bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
# gituhb 代理
kubectl apply -f https://cdn.jsdelivr.net/gh/coreos/flannel@master/Documentation/kube-flannel.yml
```

### 检查状态
```Bash
kubectl get pods -n kube-system -l app=flannel
# 集群状态
kubectl get componentstatus
# 检查节点是否准备完成
kubectl get nodes
```

## node 节点加入 master主机
### 重新生成token
```Bash
//master主机上重新生成token
kubeadm token generate
#根据token输出添加命令
kubeadm token create xxxx(上面输出的token) --print-join-command --ttl=0   
```
