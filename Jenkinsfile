pipeline {
agent { label 'Dev-Agent node' }
stages{
stage('Checkout'){
steps{
git url: 'https://github.com/akashMasih/bitbytes-server.git', branch: 'main'
 }
}

stage('Build'){
steps{
sh 'sudo docker build . -t backend:latest'
 }
}

stage('Deploy'){
steps{
echo 'deploying on server'
sh 'sudo docker stop backend || true'
sh 'sudo docker rm backend || true'
sh 'docker run -d --name backend -p 4000:4000 backend:latest'
echo "App is deploy successfully on port:4000"
     }
    }
  }
}
