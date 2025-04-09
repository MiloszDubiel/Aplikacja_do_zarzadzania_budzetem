CREATE DATABASE FinanceApp;
USE FinanceApp;

-- Tabela użytkowników
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela kategorii Kategorii
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela transakcji
CREATE TABLE Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    amount DECIMAL(15,2) NOT NULL,
    transaction_date DATE NOT NULL,
    description TEXT,
    type ENUM('Przychody', 'Wydatki'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `balance`, `password`, `created_at`) VALUES
(7, NULL, NULL, 'miloszdubiel02@wp.pl', 0.00 ,'$2b$10$xRiatImjAiIMW2Fru85kru/7xOlols316AJzSGtw9/RuZoGkRgqWS', '2025-04-04 12:52:47'),
(8, NULL, NULL, 'admin@wp.pl', 0.00,'$2b$10$PckJ8HaUrpdvp37uO8vhB.ZfXPlidiSalkHADkwehIExcBJcVyeT.', '2025-04-04 14:46:19'),
(9, NULL, NULL, 'franek@wp.pl', 0.00,'$2b$10$lRyxdspHbkTcaFQ3aoEehuowe0XXU0RpG8QcYVNri.d7xGg9cyx0m', '2025-04-07 16:31:47');


-- Transakcje użytkownika ID 7
INSERT INTO Transactions (user_id, category_id, amount, transaction_date, description, type)
VALUES
(7, 1, 35.50, '2025-04-01', 'Obiad na mieście', 'Wydatki'),
(7, 2, 15.00, '2025-04-02', 'Bilet autobusowy', 'Wydatki'),
(7, 4, 4500.00, '2025-04-01', 'Wypłata miesięczna', 'Przychody'),
(7, 5, 220.00, '2025-04-03', 'Zakupy spożywcze', 'Wydatki'),
(7, 10, 500.00, '2025-04-04', 'Przelew na konto oszczędnościowe', 'Wydatki');

-- Transakcje użytkownika ID 8 (admin)
INSERT INTO Transactions (user_id, category_id, amount, transaction_date, description, type)
VALUES
(8, 4, 7000.00, '2025-04-01', 'Pensja', 'Przychody'),
(8, 3, 100.00, '2025-04-02', 'Kino z rodziną', 'Wydatki'),
(8, 6, 300.00, '2025-04-03', 'Kupno akcji', 'Wydatki'),
(8, 7, 49.99, '2025-04-04', 'Netflix', 'Wydatki'),
(8, 10, 1000.00, '2025-04-05', 'Oszczędności', 'Wydatki');

-- Transakcje użytkownika ID 9 (franek)
INSERT INTO Transactions (user_id, category_id, amount, transaction_date, description, type)
VALUES
(9, 4, 3200.00, '2025-04-01', 'Pensja', 'Przychody'),
(9, 1, 60.00, '2025-04-02', 'Kolacja z dziewczyną', 'Wydatki'),
(9, 2, 20.00, '2025-04-02', 'Taxi', 'Wydatki'),
(9, 8, 150.00, '2025-04-03', 'Kurs online', 'Wydatki'),
(9, 10, 400.00, '2025-04-03', 'Oszczędności', 'Wydatki');

INSERT INTO Categories (name) VALUES
('Jedzenie'),
('Transport'),
('Rozrywka'),
('Wynagrodzenie'),
('Zakupy'),
('Inwestycje'),
('Subskrypcje'),
('Edukacja'),
('Zdrowie'),
('Oszczędności');
