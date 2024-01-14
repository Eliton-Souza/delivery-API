# Use uma imagem do Node.js como base
FROM node:alpine

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo de definição de pacote e o arquivo de bloqueio de pacote para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compile o TypeScript
RUN npm run build

# Expõe a porta que a aplicação estará ouvindo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
