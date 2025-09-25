-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.0.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para database.db
CREATE DATABASE IF NOT EXISTS `database.db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `database.db`;

-- Copiando estrutura para tabela database.db.produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descrição` text NOT NULL,
  `tamanho` varchar(10) NOT NULL DEFAULT 'M',
  `cor` varchar(30) NOT NULL DEFAULT 'Branco',
  `preço` decimal(10,2) unsigned NOT NULL DEFAULT 0.00,
  `quantidade_estoque` int(11) unsigned NOT NULL DEFAULT 0,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `url_imagem` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela database.db.produtos: ~10 rows (aproximadamente)
INSERT INTO `produtos` (`id`, `nome`, `descrição`, `tamanho`, `cor`, `preço`, `quantidade_estoque`, `data_criacao`, `url_imagem`) VALUES
	(1, 'Vestido A', 'Vestido clássico de noiva, detalhes em renda', 'M', 'Branco', 1500.00, 5, '2025-09-21 22:53:37', 'url_imagem_1'),
	(2, 'Vestido B', 'Vestido princesa, saia volumosa e corpete bordado', 'G', 'Branco', 2000.00, 3, '2025-09-21 22:53:37', 'url_imagem_2'),
	(3, 'Vestido C', 'Vestido moderno, decote em V, tecido leve', 'P', 'Champanhe', 1800.00, 4, '2025-09-21 22:53:37', 'url_imagem_3'),
	(4, 'Vestido D', 'Vestido sereia, corte elegante, renda francesa', 'M', 'Branco', 2200.00, 2, '2025-09-21 22:53:37', 'url_imagem_4'),
	(5, 'Vestido E', 'Vestido minimalista, corte reto, tecido acetinado', 'G', 'Branco', 1700.00, 6, '2025-09-21 22:53:37', 'url_imagem_5'),
	(6, 'Vestido F', 'Vestido vintage, mangas longas e renda delicada', 'P', 'Marfim', 1900.00, 3, '2025-09-21 22:53:37', 'url_imagem_6'),
	(7, 'Vestido G', 'Vestido boho, leve, com detalhes em crochê', 'M', 'Branco', 1600.00, 5, '2025-09-21 22:53:37', 'url_imagem_7'),
	(8, 'Vestido H', 'Vestido elegante, corpete bordado, saia fluida', 'G', 'Champanhe', 2100.00, 2, '2025-09-21 22:53:37', 'url_imagem_8'),
	(9, 'Vestido I', 'Vestido clássico, corte princesa, detalhe em pérolas', 'P', 'Branco', 2300.00, 4, '2025-09-21 22:53:37', 'url_imagem_9'),
	(10, 'Vestido J', 'Vestido moderno, corte império, tecido leve', 'M', 'Branco', 1750.00, 3, '2025-09-21 22:53:37', 'url_imagem_10');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
