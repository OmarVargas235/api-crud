## Nombre
> prueba_tecnica.

## Descripción
Deja que la gente sepa lo que tu proyecto puede hacer específicamente. Proporcione contexto y agregue un enlace a cualquier referencia con la que los visitantes no estén familiarizados. También se puede agregar aquí una lista de Características o una subsección de Antecedentes . Si existen alternativas a su proyecto, este es un buen lugar para enumerar los factores diferenciadores.

## Imagenes
Dependiendo de lo que esté haciendo, puede ser una buena idea incluir capturas de pantalla o incluso un video (con frecuencia verá GIF en lugar de videos reales). Herramientas como ttygif pueden ayudar, pero consulte Asciinema para obtener un método más sofisticado.

## Herramientas que tienes que tener instaladas en tu sistema operativo
* nodejs __v16.13.1__
* docker __v20.10.14__
* docker-compose __v1.29.2__
* typescript __v4.5.4__

# Instalación
* ```npm install``` o ```yarn install ```
    
## Uso
### Crear variables de entorno
* Crear archivo __.env__ y __.production.env__
    
    - Dentro del archivo __.env__
        
        - `PORT=`
        - `HOST=`
        - `DB_PORT=27015`
        - `DB_HOST=localhost`
        - `DB_DATABASE=prueba_tecnica`
        - `DB_USER=prueba_tecnica`
        - `DB_PASSWORD=secret`
        - `JWT_SECRET=`
        - `GOOGLE_CLIENT_ID=`
        - `GOOGLE_CLIENT_SECRET=`
        - `FACEBOOK_APP_ID=`
        - `FACEBOOK_APP_SECRET=`
    - Dentro del archivo __.production.env__
        
        - `PORT=`
        - `HOST=`
        - `GOOGLE_CLIENT_ID=`
        - `GOOGLE_CLIENT_SECRET=`
        - `FACEBOOK_APP_ID=`
        - `FACEBOOK_APP_SECRET=`

* ```docker-compose up -d```
##### Desarrollo
* ```npm run start:dev``` o ```yarn start:dev```
##### Producción
* ```npm run start:prod``` o ```yarn start:prod```

También puede documentar comandos para limpiar el código o ejecutar pruebas . Estos pasos ayudan a garantizar una alta calidad del código y reducen la probabilidad de que los cambios rompan algo sin darse cuenta. Tener instrucciones para ejecutar pruebas es especialmente útil si requiere una configuración externa, como iniciar un servidor Selenium para realizar pruebas en un navegador.

## Autores y reconocimiento
Muestre su agradecimiento a aquellos que han contribuido al proyecto.

## Licencia
Para proyectos de código abierto, diga cómo se licencia .