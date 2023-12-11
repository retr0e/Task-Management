CREATE DATABASE PBD;

USE PBD;

CREATE TABLE `Projekty` (
  `ID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Id_termin` INT,
  `Id_zespolu` INT,
  `Id_priorytetu` INT,
  `Id_statusu` INT,
  `Data_start` DATE,
  `Data_koniec` DATE
);

CREATE TABLE `Priorytety` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Priorytety` VARCHAR(255) NOT NULL
);

CREATE TABLE `Zadania` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Id_projektu` INT,
  `Id_statusu` INT,
  `Id_pracownika` INT,
  `Data_start` DATE,
  `Data_koniec` DATE
);

CREATE TABLE `Pracownicy` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Imie` VARCHAR(255) NOT NULL,
  `Nazwisko` VARCHAR(255) NOT NULL,
  `Stanowisko` VARCHAR(255) NOT NULL,
  `Ikonka` VARCHAR(255)
);

CREATE TABLE `Status` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL
);

CREATE TABLE `Zespoly` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nr_zespolu` INT NOT NULL,
  `Czlonek` INT
);

CREATE TABLE `Event` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Type` VARCHAR(255) NOT NULL
);

CREATE TABLE `Historia_Aktywnosci` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Data` DATE NOT NULL,
  `Id_event` INT,
  `Dzialanie` VARCHAR(255) NOT NULL,
  `Id_pracownika` INT
);

CREATE TABLE `Dokumentacja` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Id_projektu` INT,
  `Id_zadania` INT,
  `Komentujacy` INT,
  `Data` DATE NOT NULL,
  `Tresc` VARCHAR(255) NOT NULL
);

CREATE TABLE `PoziomDostepu` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Uprawnienia` VARCHAR(255) NOT NULL
);

CREATE TABLE `Konta` (
  `Id_konta` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Login` VARCHAR(255) NOT NULL,
  `Haslo` VARCHAR(255) NOT NULL,
  `Uprawnienia` INT NOT NULL
);

ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_priorytetu`) REFERENCES `Priorytety` (`Id`);

ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_projektu`) REFERENCES `Projekty` (`ID`);

ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy` (`Id`);

ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_statusu`) REFERENCES `Status` (`Id`);

ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_zespolu`) REFERENCES `Zespoly` (`Id`);

ALTER TABLE `Zespoly` ADD FOREIGN KEY (`Czlonek`) REFERENCES `Pracownicy` (`Id`); 

ALTER TABLE `Historia_Aktywnosci` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy` (`Id`);

ALTER TABLE `Dokumentacja` ADD FOREIGN KEY (`Id_projektu`) REFERENCES `Projekty` (`ID`);

ALTER TABLE `Dokumentacja` ADD FOREIGN KEY (`Id_zadania`) REFERENCES `Zadania` (`Id`);

ALTER TABLE `Dokumentacja` ADD FOREIGN KEY (`Komentujacy`) REFERENCES `Pracownicy` (`Id`);

ALTER TABLE `Historia_Aktywnosci` ADD FOREIGN KEY (`Id_event`) REFERENCES `Event` (`Id`);

ALTER TABLE `Pracownicy` ADD FOREIGN KEY (`Id`) REFERENCES `Konta` (`Id_konta`);

ALTER TABLE `Konta` ADD FOREIGN KEY (`Uprawnienia`) REFERENCES `PoziomDostepu` (`Id`);
