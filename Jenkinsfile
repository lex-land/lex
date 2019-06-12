// https://jenkins.io/zh/doc/book/pipeline/syntax/#%E5%B9%B6%E8%A1%8C

node {
  checkout scm
  PORJECT_NAME = "lex"
  SUNMI_ENV = "${env.BRANCH_NAME}"
  BUILD_TAG = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
  IMAGE_TAG = "latest"
  SSH_DEPLOY_CONFIGNAME = "lex.sunmi.com"
  SSH_NGINX_CONFIGNAME = "test-bridge-nginx"

  // 整理环境变量
  stage('Prepare SCM') {
    echo "当前 Git COMMIT_ID为： ${BUILD_TAG} 当前 SUNMI_ENV 为： ${SUNMI_ENV}"
    echo "IMAGE_TAG : ${IMAGE_TAG}"
    echo "整理环境变量, 拉取分支"
    echo "PORJECT_NAME : ${PORJECT_NAME}"
    echo "SSH_DEPLOY_CONFIGNAME : ${SSH_DEPLOY_CONFIGNAME}"
    echo "SSH_NGINX_CONFIGNAME : ${SSH_NGINX_CONFIGNAME}"
  }

  // 按环境变量打包
  stage('Build') {
    echo "安装基本依赖，按环境变量打包"
    def nodejs = docker.image('node:latest')
    nodejs.inside {
      sh "npm install -g yarn"
      sh "yarn"
      sh "npm run build:${SUNMI_ENV}"
    }
  }

  // Push镜像到Docker
  stage('Push') {
    echo "推送镜像 ${IMAGE_TAG} 到 https://registry.hub.docker.com"
    echo "打包镜像 ${IMAGE_TAG}..."
    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        def appImage = docker.build("sunmiorg/lex:${IMAGE_TAG}")
        echo "${IMAGE_TAG} Build完毕！！"
        appImage.push()
        echo "${IMAGE_TAG} Push完毕！！"
    }
  }

  // 目标目录为/data/www/
  // SSH登录远端拉取镜像
  stage('Deploy') {
    sshPublisher(
      publishers: [
        sshPublisherDesc(
          configName: SSH_DEPLOY_CONFIGNAME,
          transfers: [
            sshTransfer(
              cleanRemote: true,
              execCommand: "cd  /data/www/${PORJECT_NAME} && \
              IMAGE_TAG=${IMAGE_TAG} docker-compose pull lex && \
              SUNMI_ENV=${SUNMI_ENV} \
              BUILD_TAG=${BUILD_TAG} \
              IMAGE_TAG=${IMAGE_TAG} \
              docker stack deploy -c ./docker-compose.yml ${PORJECT_NAME}",
              patternSeparator: '[, ]+',
              remoteDirectory: PORJECT_NAME,
              excludes: '',
              sourceFiles: 'docker-compose.yml',
              makeEmptyDirs: true
            )
          ],
        )
      ]
    )
  }

  // SSH登录远端拉取镜像
  stage('Nginx') {
    sshPublisher(
      publishers: [
        sshPublisherDesc(
          configName: SSH_NGINX_CONFIGNAME,
          transfers: [
            sshTransfer(
              cleanRemote: false,
              execCommand: "cd  /data/www/${SSH_NGINX_CONFIGNAME} && sh deploy.sh",
              patternSeparator: '[, ]+',
              remoteDirectory: SSH_NGINX_CONFIGNAME,
              excludes: '',
              sourceFiles: "conf.d/${SSH_DEPLOY_CONFIGNAME}.conf,certs/**",
              makeEmptyDirs: false
            )
          ],
        )
      ]
    )
  }
}
