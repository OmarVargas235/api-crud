## Nombre
> prueba_tecnica.

## Herramientas que tienes que tener instaladas en tu sistema operativo
* nodejs __v16.13.1__
* docker __v20.10.14__
* docker-compose __v1.29.2__
* typescript __v4.5.4__

# Instalación
* ```npm install``` o ```yarn install ```
    
## Uso
### Crear variables de entorno
* Crear archivo __.env__
    
    - Dentro del archivo __.env__
        
        - `PORT=5000`
        - `HOST=localhost`
        - `DB_PORT=27014`
        - `DB_HOST=localhost`
        - `DB_DATABASE=prueba_tecnica`
        - `DB_USER=prueba_tecnica`
        - `DB_PASSWORD=secret`
        - `JWT_SECRET=secret`

### Correr API
* ```docker-compose up -d```
* ```npm run start:dev``` o ```yarn start:dev```

## scrips
* ```npm run prepare```