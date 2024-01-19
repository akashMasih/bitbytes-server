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
sh 'sudo docker build . -t music-backend:latest'
 }
}

stage('Deploy'){
steps{
echo 'deploying on server'
sh 'sudo docker stop music-backend || true'
sh 'sudo docker rm music-backend || true'
sh 'sudo docker run -d - name music-backend -p 4000:4000 music-backend:latest'
     }
    }
  }
}