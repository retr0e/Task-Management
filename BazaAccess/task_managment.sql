DROP DATABASE PBD;
CREATE DATABASE PBD;

USE PBD;

CREATE TABLE `Projekty` (
  `ID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Nazwa` VARCHAR(255) NOT NULL,
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

CREATE TABLE `Historia_Aktywnosci` (
  `Id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `Data` TIMESTAMP NOT NULL,
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

INSERT INTO `Priorytety` (Priorytety) VALUES
('Pilny'),
('Normalny'),
('Wstrzymany'),
('Zakończony');

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
INSERT INTO `Pracownicy` (Imie, Nazwisko, Stanowisko, Ikonka) VALUES
('Jan', 'Kowalski', 'Programista', 'icon1.png'),
('Anna', 'Nowak', 'Analityk', 'icon2.png'),
('Piotr', 'Wiśniewski', 'Tester', 'icon3.png'),
('Alicja', 'Dąbrowska', 'Programista', 'icon4.png'),
('Mateusz', 'Lewandowski', 'Analityk', 'icon5.png'),
('Karolina', 'Kowalczyk', 'Tester', 'icon6.png'),
('Marcin', 'Jankowski', 'Programista', 'icon7.png'),
('Katarzyna', 'Szymańska', 'Analityk', 'icon8.png'),
('Michał', 'Woźniak', 'Tester', 'icon9.png');

-- Dodaj rekordy do tabeli Status
INSERT INTO Status (Nazwa) VALUES
('Nowy'),
('W trakcie'),
('Zakończony');

-- Dodaj rekordy do tabeli Projekty
INSERT INTO Projekty (Nazwa, Id_zespolu, Id_priorytetu, Id_statusu, Data_start, Data_koniec) VALUES
('Projekt A', 1, 1, 1, '2023-01-01', '2023-03-31'),
('Projekt B', 2, 2, 2, '2023-02-01', '2023-04-30'),
('Projekt C', 3, 3, 3, '2023-03-01', '2023-05-31'),
('Projekt D', 4, 1, 1, '2023-04-01', '2023-06-30'),
('Projekt E', 5, 2, 2, '2023-05-01', '2023-07-31'),
('Projekt F', 6, 3, 3, '2023-06-01', '2023-08-31'),
('Projekt G', 7, 1, 1, '2023-07-01', '2023-09-30'),
('Projekt H', 8, 2, 2, '2023-08-01', '2023-10-31'),
('Projekt I', 9, 3, 3, '2023-09-01', '2023-11-30');

INSERT INTO `Zadania` (`Nazwa`, `Id_projektu`, `Id_statusu`, `Id_pracownika`, `Data_start`, `Data_koniec`) VALUES
('Zadanie 1', 1, 2, 3, '2024-01-15', '2024-01-20'),
('Zadanie 2', 1, 1, 2, '2024-02-01', '2024-02-10'),
('Zadanie 3', 2, 3, 1, '2024-03-10', '2024-03-20'),
('Zadanie 4', 2, 2, 3, '2024-04-05', '2024-04-15'),
('Zadanie 5', 3, 1, 2, '2024-05-15', '2024-05-25');

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
ALTER TABLE `Konta` ADD FOREIGN KEY (`Uprawnienia`) REFERENCES `PoziomDostepu` (`Id`);
ALTER TABLE `Konta` ADD FOREIGN KEY (`Id_konta`) REFERENCES `Pracownicy` (`Id`);