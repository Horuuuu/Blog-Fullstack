# Blog-Fullstack
React+Node+Express+Mysql
<p>Apis construidas con Node Js y Express . Con Sequelize compatible con Mysql y Sqlite</p>
Web App hecha con React Js

![](client/public/img/blog.jpg)

Caracteristicas:
<ul>
<li >Crea entradas,las edita , las elimina y las guarda en base de datos</li>
<li>Tambien edita el titulo y  el contenido de los posteos.Se pueden eliminar.</li>
<li>Sistema de autenticación con Jason Web Token.</li>
<li>Login y registro.También puede actualizar la contraseña</li>
<li>Permite al usuario  darle like a las entradas y guardarlos en la db.</li>
<li>Comentar los posteos y borrar el comentario del mismo usuario</li>
<li>Página individual del perfil del usuario</li>
</ul>
Librerias usadas y más:
<p>:heavy_check_mark:React-Router-Dom para las rutas a las diferentes páginas.</p>
<p>:heavy_check_mark:Axios para peticiones a apis.</p>
<p>:heavy_check_mark:Hooks de React useEffect,useState,useParams ,useHistory,Context Api.</p>
<p>:heavy_check_mark:Formik para  los  formularios y Yup para la validación. </p>
<p>:heavy_check_mark:Bcrypt para el hash de los passwords.</p>
<p>:heavy_check_mark:Iconos de MaterialUI</p>

Diagrama de base de datos:

Cuatro tablas , para los posteos ,  los usuarios ,  los likes y comentarios.

![](client/public/img/diagrama.jpg)
<p>Comentarios adicionales  en el código.:memo:</p>
Dentro de la carpeta server ,en config ,cambiar dialecto y la contraseña,también está el archivo sql con base de datos completa,  sino con la conexión establecida sequelize genera toda la base de datos.

<p>Para ejecutar desde el directorio server npm start y desde el directorio client  yarn start.</p>

![](client/public/img/stack_full.jpg)
