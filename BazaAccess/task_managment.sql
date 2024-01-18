DROP DATABASE IF EXISTS PBD;
CREATE DATABASE PBD;

USE PBD;

CREATE TABLE `Projekty` (
  `ID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Id_zespolu` INT,
  `Id_priorytetu` INT NOT NULL,
  `Id_statusu` INT NOT NULL,
  `Opis` VARCHAR(400),
  `Data_start` DATE,
  `Data_koniec` DATE
);

CREATE TABLE `Color_Code` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `hex` VARCHAR(10) NOT NULL
);

CREATE TABLE `Priorytety` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Priorytety` VARCHAR(255) NOT NULL,
  `Id_colorCode` INT NOT NULL
);

CREATE TABLE `Zadania` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Id_projektu` INT NOT NULL,
  `Id_statusu` INT NOT NULL,
  `Id_pracownika` INT NOT NULL,
  `Description` VARCHAR(400) NOT NULL,
);

CREATE TABLE `Pracownicy` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Imie` VARCHAR(255) NOT NULL,
  `Nazwisko` VARCHAR(255) NOT NULL,
  `Stanowisko` VARCHAR(255) NOT NULL,
  `PESEL` VARCHAR(11) NOT NULL UNIQUE KEY
);

CREATE TABLE `Status` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Id_colorCode` INT NOT NULL
);

CREATE TABLE `Zespoly` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nr_zespolu` INT NOT NULL,
  `Czlonek` INT,
  INDEX (`Nr_zespolu`)
);

CREATE TABLE `Historia_Aktywnosci` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Data` TIMESTAMP NOT NULL,
  `Dzialanie` VARCHAR(255) NOT NULL,
  `Id_pracownika` INT
);

CREATE TABLE `PoziomDostepu` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Uprawnienia` VARCHAR(255) NOT NULL
);

CREATE TABLE `Konta` (
  `Id_konta` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Id_pracownika` INT,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Login` VARCHAR(255) NOT NULL,
  `Haslo` VARCHAR(255) NOT NULL,
  `Uprawnienia` INT NOT NULL,
  `Aktywny` BOOLEAN NOT NULL
);

INSERT INTO `color_code` (`hex`) VALUES
('green-600'),
('yellow-500'),
('red-600'),
('sky-500'),
('gray-500'),
('blue-700'),
('pink-700');

INSERT INTO `Priorytety` (Priorytety, Id_colorCode) VALUES
('Pilny', 1),
('Normalny', 2),
('Wstrzymany', 3),
('Zakończony', 4);

INSERT INTO `PoziomDostepu` (`Uprawnienia`) VALUES
("Admin"),
("Kierownik"),
("Pracownik"),
("Obserwujacy");

INSERT INTO Status (Nazwa, Id_colorCode) VALUES
('Nowy', 5),
('W trakcie', 6),
('Zakończony', 7);

-- Haslo admin
INSERT INTO Konta (Id_pracownika, Nazwa, Login, Haslo, Uprawnienia, Aktywny) VALUES (1, 'Admin', 'admin.admin@gmail.com', '$2a$10$0pyG5jI3tg/MQb60Nb4RHe7zfuxApLIifyzyiIpPNAQm//bUBynNS', 1, TRUE);
INSERT INTO Pracownicy (Imie, Nazwisko, Stanowisko, PESEL) VALUES ('Patryk', 'Szymura', 'Admin', '90124576121');

ALTER TABLE `Priorytety` ADD FOREIGN KEY (`Id_colorCode`) REFERENCES `Color_Code`(`Id`);
ALTER TABLE `Status` ADD FOREIGN KEY (`Id_colorCode`) REFERENCES `Color_Code`(`Id`);


ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_priorytetu`) REFERENCES `Priorytety`(`Id`);
ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_statusu`) REFERENCES `Status`(`Id`);


ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_projektu`) REFERENCES `Projekty`(`ID`);
ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy`(`Id`);
ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_statusu`) REFERENCES `Status`(`Id`);


ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_zespolu`) REFERENCES `Zespoly`(`Nr_zespolu`);
ALTER TABLE `Zespoly` ADD FOREIGN KEY (`Czlonek`) REFERENCES `Pracownicy`(`Id`);


ALTER TABLE `Historia_Aktywnosci` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy`(`Id`);


ALTER TABLE `Konta` ADD FOREIGN KEY (`Uprawnienia`) REFERENCES `PoziomDostepu`(`Id`);
ALTER TABLE `Konta` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy`(`Id`);


