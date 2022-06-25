-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 25 jun 2022 om 16:22
-- Serverversie: 10.4.24-MariaDB
-- PHP-versie: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `choices`
--

CREATE TABLE `choices` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `correct` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `choices`
--

INSERT INTO `choices` (`id`, `question_id`, `answer`, `correct`) VALUES
(5, 9, 'answer1', 1),
(6, 9, 'answer2', 0),
(7, 9, 'answer3', 0),
(8, 9, 'answer4', 0),
(9, 10, 'answer1', 1),
(10, 10, 'answer2', 0),
(11, 10, 'answer3', 0),
(12, 10, 'answer4', 0),
(13, 11, 'answer1', 1),
(14, 11, 'answer2', 0),
(15, 11, 'answer3', 0),
(16, 11, 'answer4', 0),
(17, 12, 'test', 0),
(18, 12, 'test', 0),
(19, 12, 'test', 0),
(20, 12, 'test', 0),
(21, 13, 'test', 0),
(22, 13, 'test1', 0),
(23, 13, 'test3', 0),
(24, 13, 'test4', 0),
(25, 14, 'test', 0),
(26, 14, 'test', 0),
(27, 14, 'test', 0),
(28, 14, 'test', 0),
(29, 15, 'test', 0),
(30, 15, 'test', 0),
(31, 15, 'test', 0),
(32, 15, 'test', 0),
(33, 16, 'test', 0),
(34, 16, 'test', 0),
(35, 16, 'test', 0),
(36, 16, 'test', 0),
(37, 17, 'test', 0),
(38, 17, 'test', 0),
(39, 17, 'test', 0),
(40, 17, 'test', 0),
(41, 18, 'test', 0),
(42, 18, 'test', 0),
(43, 18, 'test', 0),
(44, 18, 'test', 0),
(45, 19, 'test', 0),
(46, 19, 'tester', 0),
(47, 19, 'testerje', 0),
(48, 19, 'testertjes', 0),
(49, 20, 'testing', 0),
(50, 20, 'tester', 1),
(51, 20, 'test', 0),
(52, 20, 'testertje', 0),
(53, 21, '3', 0),
(54, 21, '4', 1),
(55, 21, '2', 0),
(56, 21, '1', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `title`, `created_at`) VALUES
(9, 15, 'test question', '2022-06-14 10:32:06'),
(10, 16, 'test question', '2022-06-14 12:20:26'),
(12, 24, 'test', '2022-06-21 11:28:37'),
(18, 30, 'test', '2022-06-21 13:36:15'),
(19, 31, 'tester', '2022-06-21 15:14:58'),
(20, 32, 'testertje', '2022-06-21 15:17:56'),
(21, 33, 'How many legs does a giraffe have', '2022-06-21 15:22:37'),
(24, 36, 'test', '2022-06-21 15:25:28'),
(25, 36, 'testing', '2022-06-22 09:37:51');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `quiz_list`
--

CREATE TABLE `quiz_list` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `quiz_list`
--

INSERT INTO `quiz_list` (`id`, `title`, `description`, `created_at`, `created_by`) VALUES
(15, 'test quiz', 'testing quiz', '2022-06-14 10:32:06', 1),
(16, 'test quiz', 'testing quiz', '2022-06-14 12:20:26', 1),
(18, 'test', 'test', '2022-06-21 11:17:06', 17),
(19, 'test', 'test', '2022-06-21 11:22:28', 17),
(20, 'test', 'test', '2022-06-21 11:24:05', 17),
(21, 'test', 'test', '2022-06-21 11:24:44', 17),
(22, 'test', 'test', '2022-06-21 11:26:48', 17),
(23, 'test', 'test', '2022-06-21 11:27:36', 17),
(24, 'test', 'test', '2022-06-21 11:28:37', 17),
(30, 'test', 'test', '2022-06-21 13:36:15', 17),
(31, 'test', 'test', '2022-06-21 15:14:58', 13),
(32, 'tester', 'tester', '2022-06-21 15:17:56', 13),
(33, 'Animal quiz edited', 'A quiz where you have to answer questions about various animals.', '2022-06-21 15:22:37', 13);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2y$10$.fWo6BgjE2VSGyR0nhpCg.nz7bQF.Hwh2.DWNDafb.jDJIgGfLNoO', '2022-06-13 12:08:46'),
(2, 'test', '$2y$10$IwaG/vh0B6hqdZiBEfl.ieLoPsGxdzkwtnmewqxtqNF.Iey.zYBTe', '2022-06-21 08:56:24'),
(3, 'test', '$2y$10$sZCoAhQvhV.bc98TWVcKbelzy02qTZAJoJhLEWk6drym9D21wF5i6', '2022-06-21 08:57:17'),
(4, 'test', '$2y$10$EB01tztwxNerrMihHH.M6uFqMmK40QV2P0jDUCU3qwN4Nk7Ky9GE6', '2022-06-21 08:58:43'),
(5, 'test', '$2y$10$NydSiVUfTZtx/acly3R9vuMJ99JvT.Q.U4aA/ST1jcXK7riVblxCS', '2022-06-21 09:05:39'),
(6, 'testing', '$2y$10$Wj8QhdWPIXp3dQ5Yf0lIAutVb1M7K9wz2qfmBFcMNbR84iQH4pboS', '2022-06-21 09:15:08'),
(7, 'testing', '$2y$10$M2atjHQwYJO7tkELDTqeBOmaJZoBrHVbYHJ4xwXk8w/wBDwIoJT0y', '2022-06-21 09:15:23'),
(8, 'testing', '$2y$10$NLaHVyALaVHYyzJkVLnAd.wlrXbvUPIvVG0sYoRJi38NGq1i1mChq', '2022-06-21 09:16:38'),
(9, 'test', '$2y$10$Bw85VX5aFBFv1oqdJ5wNT.k.hqSoeQjXR3RSfa4l5GKYvOQ4V7YGC', '2022-06-21 09:17:50'),
(10, 'test', '$2y$10$9m3nUGxyNNtcQU8M.fuzSuwaRJ7Klz6wthZiuBc7MwXtmzH7sv8IC', '2022-06-21 09:18:42'),
(11, 'test', '$2y$10$xyfLIbLJlOxX2M7BquRMTu3PE3f9nhsqAssjBOdqBGN08rybxrGpC', '2022-06-21 09:37:09'),
(12, 'test', '$2y$10$T2ttwitTJXF5ddMxnExAXOcbCD/crhs58dF7n6d6AQusK1wqAlE3.', '2022-06-21 09:39:37'),
(13, 'bob', '$2y$10$GsMNfNbYVxYI/zDXAqQMp.tdB8iRxXmwor/QbTL5nEAdbqcoLuOO6', '2022-06-21 09:42:59'),
(14, 'bob', '$2y$10$VTyPOT/.oFnijCSW5JaVFuH7Ya.4ZpVzRdMZh/c4PqL1bQXITWMd2', '2022-06-21 09:49:14'),
(15, 'test', '$2y$10$6G3RAgpP898raPIF8NfG2uTt3eXTSX2Bkq0AgsQSoUmDiYB0RtkQe', '2022-06-21 10:16:14'),
(16, 'tesing25', '$2y$10$Vko6NkjhKDxEIsGMhDXMSuDy3XNUcf9Peh.Aj5LvA0g/7wZr/Sr1G', '2022-06-21 10:28:55'),
(17, 'bill', '$2y$10$u.5kPHrWmdAKInNF1BA42.BfN5YChrntVrLm57KzWSmnZ8K1LaJQ2', '2022-06-21 10:39:19');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`id`,`question_id`);

--
-- Indexen voor tabel `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`,`quiz_id`) USING BTREE;

--
-- Indexen voor tabel `quiz_list`
--
ALTER TABLE `quiz_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `choices`
--
ALTER TABLE `choices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT voor een tabel `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT voor een tabel `quiz_list`
--
ALTER TABLE `quiz_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
