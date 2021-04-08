# devopswithkubernetes

## Part 1

| Exercise | Directory                  |
| -------- | -------------------------- |
| 1.01     | `main-app`                 |
| 1.02     | `project`                  |
| 1.03     | `main-app`                 |
| 1.04     | `project`                  |
| 1.05     | `project`                  |
| 1.06     | `project`                  |
| 1.07     | `main-app`                 |
| 1.08     | `project`                  |
| 1.09     | `main-app` and `ping-pong` |
| 1.10     | `main-app` and `ping-pong` |
| 1.11     | `main-app` and `ping-pong` |
| 1.12     | `project`                  |
| 1.13     | `project`                  |

The images defined in the deployments use the `:latest` tag. This is not a good practice in production but is here used for quicker deployment of changed containers. In production it is recommended to use fixed container labels or `sha` checksums to reduce possible problems with newer containers.

The `project` is labeled as seen in the exercises. The releases can be found [here](https://github.com/niklasmtj/devopswithkubernetes/releases).

## Part 2

| Exercise | Directory                  |
| -------- | -------------------------- |
| 2.01     | `main-app` and `ping-pong` |
| 2.02     | `project`                  |
| 2.03     | `main-app` and `ping-pong` |
| 2.04     | `project`                  |
| 2.06     | `main-app` and `ping-pong` |
| 2.07     | `main-app` and `ping-pong` |
| 2.08     | `project`                  |
| 2.09     | `project`                  |
| 2.10     | `project`                  |


## Part 3
| Exercise | Directory                  |
| -------- | -------------------------- |
| 3.01     | `ping-pong`                |
| 3.02     | `main-app` and `ping-pong` |
| 3.03     | `project` |


### Exercise 3.01

Since the containers were built for `arm64` I had to rebuild them to work on GCP. I did this with `docker build --platform linux/amd64 -t  niklasmtj/ping-pong .` which will build an `amd64` container image.

```zsh
➜  ping-pong git:(main) ✗ k apply -f gke-manifests
configmap/pingpong-create-db-cm unchanged
deployment.apps/ping-pong created
persistentvolumeclaim/image-claim unchanged
sealedsecret.bitnami.com/pingpong-db-secret unchanged
service/ping-pong-svc unchanged
service/postgres-svc unchanged
statefulset.apps/postgres-ss configured
```

```zsh
➜  ping-pong git:(main) ✗ k get pods --watch
NAME                        READY   STATUS              RESTARTS   AGE
ping-pong-b584578db-bqktv   0/1     ContainerCreating   0          11s
postgres-ss-0               1/1     Running             0          23m
ping-pong-b584578db-bqktv   1/1     Running             0          30s
```

```zsh
➜  ping-pong git:(main) ✗ k get svc
NAME            TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)        AGE
ping-pong-svc   LoadBalancer   10.3.249.245   34.107.71.26   80:30431/TCP   23m
postgres-svc    ClusterIP      None           <none>         5432/TCP       23m
```


### Exercise 3.02

I had to rebuild my containers for `linux/amd64` with: `docker build --platform linux/amd64 -t niklasmtj/main-app-server -f Dockerfile.server .` and `docker build --platform linux/amd64 -t niklasmtj/main-app-generator -f Dockerfile.generator .`
```zsh
➜  main-app git:(main) ✗ k apply -f gke-manifests
configmap/main-app-config-map created
deployment.apps/random-string created
ingress.extensions/random-string-ingress created
persistentvolumeclaim/image-claim unchanged
persistentvolume/main-app-pv created
service/random-string-svc created
```

When the Deployment stays at `pending` this could mean that there are not enough resources to use for Kubernetes to start the Pods.

```zsh
➜  main-app git:(main) ✗ k get po --watch
NAME                             READY   STATUS    RESTARTS   AGE
ping-pong-b584578db-bqktv        1/1     Running   0          18m
postgres-ss-0                    1/1     Running   0          41m
random-string-58d999f8d5-k8pmz   0/2     Pending   0          10s
```

Because my Kubernetes VSCode extension always bugged me to use resource limits I added them before. This seemed to be the problem here. After removing them the Pods were able to be created.

```zsh
➜  ping-pong git:(main) ✗ k describe ingress random-string-ingress
Name:             random-string-ingress
Namespace:        main-app
Address:          35.190.51.0
Default backend:  default-http-backend:80 (10.0.2.3:8080)
Rules:
  Host        Path  Backends
  ----        ----  --------
  *
              /           random-string-svc:80 (10.0.2.8:3000)
              /pingpong   ping-pong-svc:80 (10.0.3.10:3000)
```