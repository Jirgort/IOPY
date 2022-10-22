# IOProyecto

## Especificación

Este mini proyecto creará una aplicación web realizada con Angular o React; será una interfaz básica de los siguientes proyectos programados de la primera parte del curso. Todas las interfaces serán gráficas. No se pueden cambiar las especificaciones del proyecto.

Este proyecto desplegará un menú con múltiples algoritmos de Programación Dinámica (en la versión inicial ninguno estará disponible). Se quiere que sea visualmente agradable, bien acabado y profesional. Para cada opción ofrecida debe aparecer una “burbujita” con una descripción general cuando el cursor se pose sobre ellos (tooltip). Este menú no hará más que servir de interfaz para mandar a ejecutar el programa seleccionado, usando. La opciones que se mostrarán son las siguientes: Rutas más cortas, el Problema de la Mochila, Reemplazo de Equipos, Árboles Binarios de Búsqueda, Óptimos Series Deportivas, Multiplicación de Matrices, Salir del Programa.

Cada ejecución de un algoritmo será un componente de Angular o React que implementa dicho algoritmo, si dicho algoritmo no está disponible se debe desplegar alguna alerta indicando que el programa solicitado no está disponible.

## Framework utilizado

- Angular versión 14.2.3

## Compilación 

1. Abrir el proyecto en la herramienta visual studio code
2. Abrir una terminal en la carpeta del proyecto
3. Escribir `npm install` para instalar las dependencias
4. Escribir en consola `ng serve` para cargar la pagina en el navegador
5. Debe instalar Nodejs y Angular Cli para que se pueda compilar sin problemas.

## Menu principal

Para hacer uso del menú principal y el programa debemos inicializarlo, para esto debemos acceder a la carpeta del programa IOPY y ejecutar el comando ng serve y en el navegador acceder a localhost:4200.
Una vez iniciado se mostrará la página principal del menú de algoritmos en el navegador.

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197315305-a9e73afe-e505-4ac7-9c3f-ef9f993d9a36.png)

</div>

## Algoritmo de Floyd

Para ejecutar el algoritmo de las rutas más cortas se debe ingresar en la opción del menú, luego de darle click se mostrará la siguiente tabla:

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197315387-f728990e-e997-4c13-ae3d-42caa86ed008.png)

</div>

Par editar el peso de los nodos solo basta con posicionar el cursor sobre la celda y colocar un número sobre el cómo se muestra a continuación:

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197315438-dbd23ca6-7cda-45f0-86e0-0489dca9fba2.png)

</div>

Para calcular las rutas más cortas se presiona el botón de calcular y automáticamente van a cambiar los valores en la tabla.

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197315521-39f21d72-bc2f-45f5-8c6c-a4efa8b6089e.png)

</div>

Además, para cambiar el nombre de los nodos, solo basta con seleccionar el nombre de la fila o columna a cambiar y este se cambiará en su columna o fila respectiva.

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197315545-a096e1f0-a188-4f4b-bad1-21bc1fbb9737.png)

</div>

## Problema de la mochila 

Algoritmo que encuentra la mejor forma de rellenar una mochila según su capacidad y el peso de objetos entre un conjunto finito de posibles soluciones.

Este algoritmo tiene dos formas de ingresarle datos, mediante la intefaz o subiendo un archivo json.

### Archivo JSON
A continuación se muestra un ejemplo del formato del archivo json:

```json
{
	"capacidad":3,
	"objetos":[
		{
			"nombre": "Objeto 0",
			"valor": 1,
			"peso": 2
		},
		{
			"nombre": "Objeto 1",
			"valor": 30,
			"peso": 3
		},
		{
			"nombre": "Objeto 2",
			"valor": 10,
			"peso": 2
		}		
	]
}
```

Para cargar el archivo solo se debe seleccionar el archivo dando click en el botón de examinar, luego se elige el archivo json.

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197315990-de367bcd-d788-48fa-88ce-7059c38ac824.png)
![imagen](https://user-images.githubusercontent.com/34630050/197316007-87dbdebe-2b4f-4b58-8bfc-0e27f9efabaf.png)

</div>

Una vez cargado el archivo se puede generar la tabla en el botón que dice "Generar tabla" y automáticamente se ingresarán los datos en los campos correspondientes

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197316044-7a0b9fe6-8b4a-413d-a8a6-e1c32159890f.png)
![imagen](https://user-images.githubusercontent.com/34630050/197316057-fbb948c8-46b1-43ed-9dff-2efbfe6c3418.png)

</div>

### Ingresar input mediante interfaz

Para ingresar datos mediante la intefaz se debe seguir los siguientes pasos:

- Ingresar el tamaño de la mochila
- Ingresar la cantidad de objetos

Una vez ingresado estos dos datos se genera la tabla y se mostrará una tabla donde se ingresan los valores y sus pesos, además de editar el nombre del objeto.


<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197316310-34f7d845-69d1-47e1-8e38-974c56ca74e1.png)

</div>

### Generar archivo

El programa puede generar un archivo json con los datos que fueron ingresados mediante la interfaz. 
Para guardar los datos ingresados mediante la table solo se debe dar click en el botón de "Generar archivo" una vez se hayan dado click, el programa descargará el archivo json.

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197316404-410cf2f3-65ec-43ad-8914-5e49e2646db0.png)

</div>

### Calcular 
Para calcular el resultado se debe dar click en el botón de calcular y el programa mostrará el resultado en su respectiba tabla de resultados.

<div align="center">

![imagen](https://user-images.githubusercontent.com/34630050/197316466-0b9cb197-8cc2-4583-9c1a-3d49222b08d7.png)

</div>
