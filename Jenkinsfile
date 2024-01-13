def sgm () 
            {
            def gitVars = git branch: 'main', url:'https://github.com/akashMasih/bitbytes-server.git'
            def gitcommit = "${gitVars.GIT_COMMIT}"[0..7]
            return gitcommit
            }
            
pipeline {
 agent {node { label 'music-backend' } }
    stages{
          stage('Build Image') {
             steps {
                echo 'Starting to build docker image using Docker Compose'
                script {
                    env.shortgitcommit = sgm ()
                    sh "cp /home/ubuntu/finnety_backend_env/.env /opt/arambh--stg-jenkins/workspace/finnety-backend/"
                    sh "COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build --no-cache"
                 }
                }
            }
          stage('Deploy Container') {
            steps {
                echo 'Starting to deploy docker container using Docker Compose'
                script {
                    env.shortgitcommit = sgm ()
                    sh "docker-compose up -d"
                    echo "Container is Started on Port 4000"
                     }  
                  }
               } 
        }  
        }
