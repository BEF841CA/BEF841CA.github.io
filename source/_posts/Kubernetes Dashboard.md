---
title: Kubernetes Dashboard 
date: 2022-03-22 20:52:56
tags: [Kubernetes]
category: Kubernetes
---
## 选择合适版本

_根据Kubernetes版本选择对应版本 可去[github releases页面](https://github.com/kubernetes/dashboard/releases)查看_

### 查看Kubernetes版本

```Bash
kubectl version
```

## 构建 Pod

具体命令可以查看 [github releases页面](https://github.com/kubernetes/dashboard/releases) Installation

## 查看 Pod 状态

```Bash
kubectl get pods --all-namespaces | grep dashboard
```

## 重新创建 dashboard 服务

_删除现有的 dashboard 服务，dashboard 服务的 namespace 是 kubernetes-dashboard，但是该服务的类型是ClusterIP，不便于我们通过浏览器访问，因此需要改成 NodePort 类型的_

### 查看类型

```Bash
kubectl get svc --all-namespaces
```

### 删除 dashboard 服务

```Bash
kubectl delete service kubernetes-dashboard --namespace=kubernetes-dashboard
```

### 创建配置文件dashboard-svc.yaml

```Bash
cat > dashboard-svc.yaml <<-EOF
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort
  ports:
    - port: 443
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
EOF
```

### 创建服务

```Bash
kubectl apply -f dashboard-svc.yaml
```

## 创建管理员角色

### 创建配置文件dashboard-svc-account.yaml

```Bash
cat > dashboard-svc-account.yaml <<-EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: dashboard-admin
  namespace: kube-system
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: dashboard-admin
subjects:
  - kind: ServiceAccount
    name: dashboard-admin
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
```

### 创建角色

```Bash
kubectl apply -f dashboard-svc-account.yaml 
```

### 获取token

```Bash
# 查看账号
kubectl get secret -n kube-system |grep admin|awk '{print $1}'
# 获取token
kubectl describe secret dashboard-admin-token-xxxxx(上面获取的账号) -n kube-system|grep '^token'|awk '{print $2}'
```

## 登录

### 查看访问端口

```Bash
kubectl get svc --all-namespaces | grep dashboard
```
