CREATE DATABASE  IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commentBody` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'muy bueno!!!!!!!','cristi','2021-10-31 00:14:00','2021-10-31 00:14:00',4),(3,'comentario de usuario dos','cristi','2021-10-31 00:14:25','2021-10-31 00:14:25',2),(4,'Clickeando en el nombre en la parte inferior del post.','Horuuuu','2021-10-31 00:24:07','2021-10-31 00:24:07',6),(5,'si algo no funciona refrescar la pagina','Horuuuu','2021-10-31 00:29:19','2021-10-31 00:29:19',5),(6,'REFRESCAR LA PAGINA ','Horuuuu','2021-11-05 18:46:37','2021-11-05 18:46:37',2),(8,'COMENTARIO','HORACIO','2021-11-06 01:05:16','2021-11-06 01:05:16',2);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,'2021-10-31 00:00:57','2021-10-31 00:00:57',2,2),(4,'2021-10-31 00:15:36','2021-10-31 00:15:36',4,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `postText` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'Blog Fullstack','Blog Fullstack tipo Blogger,hecho con React Js, Node Js ,Express Js y Mysql. Con imperfecciones y cosas a mejorar ,como yo :)','Horuuuu','2021-10-30 23:55:47','2021-10-31 00:28:26',1),(4,'Librerias y otros','react-router-dom  axios  hooks de react useeffect,usestate,useparams ,usehistory,context api formik para  los  formularios y yup para la validacion  bcrypt para el hash de los passwords iconos de materialui','cristi','2021-10-31 00:08:08','2021-10-31 00:08:08',2),(5,'Caracteristicas','Crea entradas ,las edita y las elimina , tambien edita el titulo y el contenido de los posteos. Sistema de autenticación con JasonWebToken y permite actualizar la contraseña. Permite al usuario darle like y guardar en la base de datos.','Horuuuu','2021-10-31 00:19:37','2021-10-31 00:19:37',1),(6,'Caracteristicas dos','Comenta y borra el comentario del mismo usuario. Pagina individual del perfil del usuario.','Horuuuu','2021-10-31 00:21:34','2021-10-31 00:21:34',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Horuuuu','$2b$10$F87mKZXLStyi2gSue9m61uk/JyUqNZnRfeMqklYBWcIE66o067uOe','2021-10-30 23:55:03','2021-10-30 23:55:03'),(2,'cristi','$2b$10$gdPOH/oz2cgB8jpU6ErbcO77ghhxIivH6hFvyYevh5oZ3a4ImhMae','2021-10-31 00:00:34','2021-10-31 00:00:34'),(3,'prueba','$2b$10$Y47R97avN5xWu.Nb0VDPjePGrbxNO3Wr1yPX4p2TCUxzI9B5RPVse','2021-11-05 18:14:02','2021-11-05 18:14:02'),(9,'HORACIO','$2b$10$ya/QRtxAKaKIiQqKOf3ctu5rNJxnhK5smDRKvHtaywlpdcl53NxbK','2021-11-06 01:04:34','2021-11-06 01:04:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-06 18:11:41
