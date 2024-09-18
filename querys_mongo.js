// Ejercicio 1: Crear y Poblar una Colección
// Crear una base de datos llamada colegio.
// Crear una colección llamada estudiantes e insertar múltiples documentos utilizando insertMany.
// Insertar un estudiante solo con nombre, apellido y curso para verificar la flexibilidad de MongoDB en la estructura de los documentos.

// Crear la base de datos y la colección
//use colegio
db.estudiantes.insertMany([
  { nombre: "Ana", apellido: "Pérez", curso: "Matemáticas", edad: 20, correo: "ana@example.com", sexo: "F" },
  { nombre: "Luis", apellido: "Gómez", curso: "Historia", edad: 22, correo: "luis@example.com", sexo: "H" },
  { nombre: "María", apellido: "López", curso: "Ciencias", edad: 21, correo: "maria@example.com", sexo: "F" },
  { nombre: "Carlos", apellido: "Sánchez", curso: "Física", edad: 23, correo: "carlos@example.com", sexo: "H" },
  { nombre: "Sofía", apellido: "Martínez", curso: "Química", edad: 20, correo: "sofia@example.com", sexo: "F" }
]);

// Insertar un estudiante solo con algunos campos
db.estudiantes.insertOne({ nombre: "Pedro", apellido: "Ramírez", curso: "Arte" });

// Ejercicio 2: Realizar Búsquedas
// Buscar todos los estudiantes.
// Buscar estudiantes por sexo.
// Contar los documentos totales.
// Contar estudiantes que son mujeres.

// Buscar todos los estudiantes
db.estudiantes.find().pretty();
// Buscar estudiantes por sexo
db.estudiantes.find({ sexo: "H" });
// Contar el número de documentos totales
db.estudiantes.countDocuments();
// Contar el número de documentos que cumplen con el criterio: "Es mujer"
db.estudiantes.countDocuments({ sexo: "F" });

// Ejercicio 3: Operaciones con Filtros
// Insertar más documentos en la colección clientes.
// Listar clientes aplicando diferentes filtros y ordenamientos.

// 1. Insertar documentos adicionales
db.clientes.insertMany([
    { nombre: "Pablo", edad: 25 },
    { nombre: "Juan", edad: 22 },
    { nombre: "Lucia", edad: 25 },
    { nombre: "Juan", edad: 29 },
    { nombre: "Fede", edad: 35 }
  ]);
  
// 2. Listar todos los documentos de la coleccion clientes ordenados por edad ascendente
db.clientes.find().sort({ edad: 1 });
// 3. Listar todos los clientes ordenados por edad descendente
db.clientes.find().sort({ edad: -1 });
// 4. Listar el cliente más joven
db.clientes.find().sort({ edad: 1 }).limit(1);
// 5. Listar los clientes llamados 'Juan'
db.clientes.find({ nombre: "Juan" });
// 6. Listar los clientes llamados 'Juan' y que tengan 29 años
db.clientes.find({ nombre: "Juan", edad: 29 });
// 7. Listar los clientes llamados 'Juan' o 'Lucia'
db.clientes.find({ $or: [ { nombre: "Juan" }, { nombre: "Lucia" } ] });
// 8. Listar los clientes que tengan más de 25 años
db.clientes.find({ edad: { $gt: 25 } });
// 9. Listar los clientes que tengan 25 años o menos
db.clientes.find({ edad: { $lte: 25 } });
// 10. Listar los clientes que NO tengan 25 años
db.clientes.find({ edad: { $ne: 25 } });
// 11. Listar los clientes que estén entre los 26 y 35 años
db.clientes.find({ edad: { $gte: 26, $lte: 35 } });
// 12. Actualizar la edad de 'Fede' a 36 años y verificar
db.clientes.updateOne({ nombre: "Fede" }, { $set: { edad: 36 } });
db.clientes.find({ nombre: "Fede" });
// 13. Actualizar todas las edades de 25 años a 26 años y verificar
db.clientes.updateMany({ edad: 25 }, { $set: { edad: 26 } });
db.clientes.find({ edad: 26 });
// 14. Borrar los clientes que se llamen 'Juan' y listar el resultado
db.clientes.deleteMany({ nombre: "Juan" });
db.clientes.find();
// 15. Eliminar todos los documentos de estudiantes que hayan quedado con algún valor
db.estudiantes.deleteMany({});
db.estudiantes.find();

//#FindTheBug

//Consulta 1: Insertar múltiples mascotas
db.pets.insertOne([{name:"aletas",specie:"fish"},{name:"Doby",{specie:"dog"}])

// Error:
// *insertOne se usa para insertar un solo documento, mientras que aquí se intenta insertar un array de documentos.
// *Falta un paréntesis de cierre al final.
// *En el segundo objeto del array hay una coma extra antes del segundo {, lo que lo hace una sintaxis incorrecta.
//CORRECCION
db.pets.insertOne({ name: "aletas", specie: "fish" });


// Consulta 2: Obtener solo las últimas 5 mascotas que sean peces
db.pets.find({specie:"fish}).limit(5)

// Error:
// *Falta el cierre de comillas para el valor "fish".
// *No está claro qué se entiende por "últimas 5 mascotas"; MongoDB no almacena automáticamente un orden, así que necesitarías un campo por el cual ordenar, como una fecha de inserción
// CORRECCION: Primero, agrega el cierre de comillas. Luego, si quieres obtener las "últimas" 5, necesitarás ordenar por un campo, por ejemplo, una fecha (createdAt):
db.pets.find({ specie: "fish" }).sort({ createdAt: -1 }).limit(5);


// Consulta 3: Obtener solo el nombre de las últimas 5 mascotas cuya edad sea menor de 10 años
db.pets.find(age:{ $gte:{10}}},{name:1}).sort(age:1).limit(5)

Error:
// *Falta una apertura de llave { después de find.
// *El operador $gte está incorrecto para el propósito. Debe ser $lt si se busca "menor de 10 años".
// *Los operadores $lt, $gte, etc., deben ir en formato { campo: { operador: valor } }.
// *La propiedad age no está entre comillas.
// *Falta un cierre de paréntesis al final.
// CORECCION:
db.pets.find({ age: { $lt: 10 } }, { name: 1 }).sort({ age: 1 }).limit(5);

// Resumen de errores
// Sintaxis: Comas, paréntesis y llaves deben estar correctamente balanceados.
// Uso de métodos: insertOne es para un solo documento, insertMany es para múltiples.
// Faltas de comillas: Los valores de cadenas deben estar entre comillas.
// Operadores: Los operadores como $gte, $lt deben ser correctamente aplicados según la lógica que se desea implementar.
