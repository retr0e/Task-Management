DROP DATABASE PBD;
CREATE DATABASE PBD;

USE PBD;

CREATE TABLE `Projekty` (
  `ID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Id_zespolu` INT NOT NULL,
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
  `Data_start` DATE NOT NULL,
  `Data_koniec` DATE
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
  `Czlonek` INT
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
  `Id_pracownika` INT NOT NULL,
  `Nazwa` VARCHAR(255) NOT NULL,
  `Login` VARCHAR(255) NOT NULL,
  `Haslo` VARCHAR(255) NOT NULL,
  `Uprawnienia` INT NOT NULL
);

INSERT INTO `color_code` (`Id`, `hex`) VALUES
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

-- Dodaj rekordy do tabeli Zespoly
INSERT INTO `Zespoly` (Nr_zespolu, Czlonek) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4),
(2, 5),
(3, 6),
(1, 7),
(2, 8),
(3, 9);

-- Dodaj rekordy do tabeli Pracownicy
INSERT INTO `Pracownicy` (Imie, Nazwisko, Stanowisko, PESEL) VALUES
('Jan', 'Kowalski', 'Programista', '12345674563'),
('Anna', 'Nowak', 'Analityk', '52341351352'),
('Piotr', 'Wiśniewski', 'Tester', '93758463720'),
('Alicja', 'Dąbrowska', 'Programista', '10275948372'),
('Mateusz', 'Lewandowski', 'Analityk', '74928374651'),
('Karolina', 'Kowalczyk', 'Tester', '91023421234'),
('Marcin', 'Jankowski', 'Programista', '12361245321'),
('Katarzyna', 'Szymańska', 'Analityk', '75840395748'),
('Michał', 'Woźniak', 'Tester', '87584321239');

-- Dodaj rekordy do tabeli Status
INSERT INTO Status (Nazwa, Id_colorCode) VALUES
('Nowy', 5),
('W trakcie', 6),
('Zakończony', 7);

-- Dodaj rekordy do tabeli Projekty
INSERT INTO Projekty (Nazwa, Id_zespolu, Id_priorytetu, Id_statusu, Opis, Data_start, Data_koniec) VALUES
('Projekt A', 1, 1, 1, '', '2023-01-01', '2023-03-31'),
('Projekt B', 2, 2, 2, '', '2023-02-01', '2023-04-30'),
('Projekt C', 3, 3, 3, '', '2023-03-01', '2023-05-31'),
('Projekt D', 4, 1, 1, '', '2023-04-01', '2023-06-30'),
('Projekt E', 5, 2, 2, '', '2023-05-01', '2023-07-31'),
('Projekt F', 6, 3, 3, '', '2023-06-01', '2023-08-31'),
('Projekt G', 7, 1, 1, '', '2023-07-01', '2023-09-30'),
('Projekt H', 8, 2, 2, '', '2023-08-01', '2023-10-31'),
('Projekt I', 9, 3, 3, '', '2023-09-01', '2023-11-30');

INSERT INTO `Zadania` (`Nazwa`, `Id_projektu`, `Id_statusu`, `Id_pracownika`, `Description`, `Data_start`, `Data_koniec`) VALUES
('Zadanie 1', 1, 2, 3, 'cokolwiek', '2024-01-15', '2024-01-20'),
('Zadanie 2', 1, 1, 2, 'cokolwiek', '2024-02-01', '2024-02-10'),
('Zadanie 3', 2, 3, 1, 'cokolwiek', '2024-03-10', '2024-03-20'),
('Zadanie 4', 2, 2, 3, 'cokolwiek', '2024-04-05', '2024-04-15'),
('Zadanie 5', 3, 1, 2, 'cokolwiek', '2024-05-15', '2024-05-25');

ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_priorytetu`) REFERENCES `Priorytety` (`Id`);
ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_projektu`) REFERENCES `Projekty` (`ID`);
ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy` (`Id`);
ALTER TABLE `Zadania` ADD FOREIGN KEY (`Id_statusu`) REFERENCES `Status` (`Id`);
ALTER TABLE `Projekty` ADD FOREIGN KEY (`Id_zespolu`) REFERENCES `Zespoly` (`Id`);
ALTER TABLE `Zespoly` ADD FOREIGN KEY (`Czlonek`) REFERENCES `Pracownicy` (`Id`); 
ALTER TABLE `Historia_Aktywnosci` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy` (`Id`);
ALTER TABLE `Konta` ADD FOREIGN KEY (`Uprawnienia`) REFERENCES `PoziomDostepu` (`Id`);
ALTER TABLE `Konta` ADD FOREIGN KEY (`Id_pracownika`) REFERENCES `Pracownicy` (`Id`);
ALTER TABLE `Priorytety` ADD FOREIGN KEY (`Id_colorCode`) REFERENCES `Color_Code`(`Id`);
ALTER TABLE `Status` ADD FOREIGN KEY (`Id_colorCode`) REFERENCES `Color_Code`(`Id`);
