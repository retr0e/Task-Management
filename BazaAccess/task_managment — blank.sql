C-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2023 at 03:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `historia_dzialan`
--

CREATE TABLE `historia_dzialan` (
  `id` int(11) NOT NULL ,
  `data` datetime DEFAULT NULL ,
  `dzialanie` varchar(255) DEFAULT NULL ,
  `kto_zmienia` int(11) DEFAULT 0 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `komentarze`
--

CREATE TABLE `komentarze` (
  `id` int(11) NOT NULL ,
  `projekt` int(11) DEFAULT 0 ,
  `zadanie` int(11) DEFAULT 0 ,
  `komentujacy` int(11) DEFAULT 0 ,
  `data` datetime DEFAULT NULL ,
  `tresc` longtext DEFAULT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `pracownicy`
--

CREATE TABLE `pracownicy` (
  `id` int(11) NOT NULL ,
  `imie` varchar(255) DEFAULT NULL ,
  `nazwisko` varchar(255) DEFAULT NULL ,
  `stanowisko` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

--
-- Dumping data for table `pracownicy`
--

--INSERT INTO `pracownicy` (`id`, `imie`, `nazwisko`, `stanowisko`) VALUES
--(1, 'Jan', 'Nowak', 'Programista'),


-- --------------------------------------------------------

--
-- Table structure for table `priorytety`
--

CREATE TABLE `priorytety` (
  `id` int(11) NOT NULL ,
  `priorytet` varchar(255) DEFAULT NULL ,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

--
-- Dumping data for table `priorytety`
--

-- --------------------------------------------------------

--
-- Table structure for table `projekty`
--

CREATE TABLE `projekty` (
  `id` int(11) NOT NULL ,
  `nazwa` varchar(255) DEFAULT NULL ,
  `termin` int(11) DEFAULT 0 ,
  `zespol` int(11) DEFAULT 0 ,
  `priorytet` int(11) DEFAULT 0 ,
  `status` int(11) DEFAULT 0 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

--
-- Dumping data for table `projekty`
--

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL ,
  `nazwa` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `terminy`
--

CREATE TABLE `terminy` (
  `id` int(11) NOT NULL ,
  `data_start` datetime DEFAULT NULL ,
  `data_koniec` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `zadania`
--

CREATE TABLE `zadania` (
  `id` int(11) NOT NULL ,
  `nazwa` varchar(255) DEFAULT NULL ,
  `projekt` int(11) DEFAULT 0 ,
  `status` int(11) DEFAULT 0 ,
  `kto_wykonuje` int(11) DEFAULT 0 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

-- --------------------------------------------------------

--
-- Table structure for table `zespoly`
--

CREATE TABLE `zespoly` (
  `id` int(11) NOT NULL ,
  `nr_zespołu` int(11) DEFAULT 0 ,
  `czlonek_zespolu` int(11) DEFAULT 0 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historia_dzialan`
--
ALTER TABLE `historia_dzialan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pracownicyhistoria_dzialan` (`kto_zmienia`);

--
-- Indexes for table `komentarze`
--
ALTER TABLE `komentarze`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pracownicykomentarze` (`komentujacy`),
  ADD KEY `projektykomentarze` (`projekt`),
  ADD KEY `zadaniakomentarze` (`zadanie`);

--
-- Indexes for table `pracownicy`
--
ALTER TABLE `pracownicy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `priorytety`
--
ALTER TABLE `priorytety`
  ADD PRIMARY KEY (`id`),
  ADD KEY `priorytetypriorytet` (`priorytet`);

--
-- Indexes for table `projekty`
--
ALTER TABLE `projekty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `priorytetyprojekty` (`priorytet`),
  ADD KEY `statusprojekty` (`status`),
  ADD KEY `zespolyprojekty` (`zespol`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terminy`
--
ALTER TABLE `terminy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zadania`
--
ALTER TABLE `zadania`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projektyzadania` (`projekt`),
  ADD KEY `statuszadania` (`status`);

--
-- Indexes for table `zespoly`
--
ALTER TABLE `zespoly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pracownicyzespoly` (`czlonek_zespolu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historia_dzialan`
--
ALTER TABLE `historia_dzialan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT ;

--
-- AUTO_INCREMENT for table `komentarze`
--
ALTER TABLE `komentarze`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT ;

--
-- AUTO_INCREMENT for table `pracownicy`
--
ALTER TABLE `pracownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `priorytety`
--
ALTER TABLE `priorytety`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projekty`
--
ALTER TABLE `projekty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `terminy`
--
ALTER TABLE `terminy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT ;

--
-- AUTO_INCREMENT for table `zadania`
--
ALTER TABLE `zadania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `zespoly`
--
ALTER TABLE `zespoly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historia_dzialan`
--
ALTER TABLE `historia_dzialan`
  ADD CONSTRAINT `pracownicyhistoria_dzialan` FOREIGN KEY (`kto_zmienia`) REFERENCES `pracownicy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `komentarze`
--
ALTER TABLE `komentarze`
  ADD CONSTRAINT `pracownicykomentarze` FOREIGN KEY (`komentujacy`) REFERENCES `pracownicy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `projektykomentarze` FOREIGN KEY (`projekt`) REFERENCES `projekty` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `zadaniakomentarze` FOREIGN KEY (`zadanie`) REFERENCES `zadania` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `projekty`
--
ALTER TABLE `projekty`
  ADD CONSTRAINT `priorytetyprojekty` FOREIGN KEY (`priorytet`) REFERENCES `priorytety` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `statusprojekty` FOREIGN KEY (`status`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `zespolyprojekty` FOREIGN KEY (`zespol`) REFERENCES `zespoly` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `zadania`
--
ALTER TABLE `zadania`
  ADD CONSTRAINT `projektyzadania` FOREIGN KEY (`projekt`) REFERENCES `projekty` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `statuszadania` FOREIGN KEY (`status`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `zespoly`
--
ALTER TABLE `zespoly`
  ADD CONSTRAINT `pracownicyzespoly` FOREIGN KEY (`czlonek_zespolu`) REFERENCES `pracownicy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
