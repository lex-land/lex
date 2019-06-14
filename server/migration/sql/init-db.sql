-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主机：127.0.0.1
-- 生成日期：2019-06-11 14:49:22
-- 服务器版本：8.0.16
-- PHP 版本：7.1.23
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
  AUTOCOMMIT = 0;
START TRANSACTION;
SET
  time_zone = "+00:00";
  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;
--
  -- 数据库：`test`
  --
  CREATE DATABASE IF NOT EXISTS `Lex` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Lex`;
-- --------------------------------------------------------
  --
  -- 表的结构`interface`
  --
  CREATE TABLE `interface` (
    `id` int(11) NOT NULL,
    `name` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
    `url` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
    `method` enum('GET', 'POST', 'PUT', 'DELETE') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'POST' COMMENT 'API method',
    `description` text COLLATE utf8mb4_general_ci NOT NULL,
    `priority` bigint(20) NOT NULL DEFAULT '1',
    `creatorId` int(11) DEFAULT NULL,
    `lockerId` int(11) DEFAULT NULL,
    `moduleId` int(11) DEFAULT NULL,
    `repositoryId` int(11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`module`
  --
  CREATE TABLE `module` (
    `id` int(11) NOT NULL,
    `name` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
    `description` text COLLATE utf8mb4_general_ci NOT NULL,
    `priority` bigint(20) NOT NULL DEFAULT '1',
    `creatorId` int(11) DEFAULT NULL,
    `repositoryId` int(11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`organization`
  --
  CREATE TABLE `organization` (
    `id` int(11) NOT NULL,
    `name` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
    `description` text COLLATE utf8mb4_general_ci NOT NULL,
    `logo` varchar(256) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://work.alibaba-inc.com/photo/undefined.220x220.jpg',
    `visibility` tinyint(4) NOT NULL DEFAULT '1' COMMENT 'true:public, false:private',
    `creatorId` int(11) DEFAULT NULL,
    `ownerId` int(11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`organization_members_user`
  --
  CREATE TABLE `organization_members_user` (
    `organizationId` int(11) NOT NULL,
    `userId` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`property`
  --
  CREATE TABLE `property` (
    `id` int(11) NOT NULL,
    `scope` enum('request', 'response') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'response' COMMENT 'property owner',
    `type` enum(
      'String',
      'Number',
      'Boolean',
      'Object',
      'Array',
      'Function',
      'RegExp'
    ) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'property type',
    `name` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
    `mock` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '5' COMMENT 'property generation rules',
    `default` text COLLATE utf8mb4_general_ci NOT NULL COMMENT 'value of this property',
    `description` text COLLATE utf8mb4_general_ci NOT NULL,
    `required` tinyint(4) NOT NULL DEFAULT '0',
    `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `nsleft` int(11) NOT NULL DEFAULT '1',
    `nsright` int(11) NOT NULL DEFAULT '2',
    `creatorId` int(11) DEFAULT NULL,
    `interfaceId` int(11) DEFAULT NULL,
    `moduleId` int(11) DEFAULT NULL,
    `repositoryId` int(11) DEFAULT NULL,
    `parentId` int(11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`repository`
  --
  CREATE TABLE `repository` (
    `id` int(11) NOT NULL,
    `name` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
    `description` text COLLATE utf8mb4_general_ci NOT NULL,
    `logo` varchar(256) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://work.alibaba-inc.com/photo/undefined.220x220.jpg',
    `visibility` tinyint(4) NOT NULL DEFAULT '1' COMMENT 'true:public, false:private',
    `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `creatorId` int(11) DEFAULT NULL,
    `ownerId` int(11) DEFAULT NULL,
    `organizationId` int(11) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`repository_members_user`
  --
  CREATE TABLE `repository_members_user` (
    `repositoryId` int(11) NOT NULL,
    `userId` int(11) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- --------------------------------------------------------
  --
  -- 表的结构`user`
  --
  CREATE TABLE `user` (
    `id` int(11) NOT NULL,
    `fullname` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
    `password` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
    `email` varchar(128) COLLATE utf8mb4_general_ci NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
--
  -- 转储表的索引
  --
  --
  -- 表的索引`interface`
  --
ALTER TABLE
  `interface`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_861f12d9b4cabf52f7f201a5de6` (`creatorId`),
ADD
  KEY `FK_20a54ebe51a2b5ea077bc3b51bd` (`lockerId`),
ADD
  KEY `FK_653c7c59f0c094d534acf40cd4e` (`moduleId`),
ADD
  KEY `FK_f9c4e0ecfeb52e7d58175765dec` (`repositoryId`);
--
  -- 表的索引`module`
  --
ALTER TABLE
  `module`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_1a96608338d33b3b71285961206` (`creatorId`),
ADD
  KEY `FK_04596c4e5ae737a08d76f9f0f15` (`repositoryId`);
--
  -- 表的索引`organization`
  --
ALTER TABLE
  `organization`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_221ca61526d7f786a4c4a46e59b` (`creatorId`),
ADD
  KEY `FK_67c515257c7a4bc221bb1857a39` (`ownerId`);
--
  -- 表的索引`organization_members_user`
  --
ALTER TABLE
  `organization_members_user`
ADD
  PRIMARY KEY (`organizationId`, `userId`),
ADD
  KEY `IDX_843397c8844ae95ab56fc627b8` (`organizationId`),
ADD
  KEY `IDX_db746d1355b95ce189081f816d` (`userId`);
--
  -- 表的索引`property`
  --
ALTER TABLE
  `property`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_ed7d5833a29c7b1ac4e17e3906b` (`creatorId`),
ADD
  KEY `FK_1e24e999294403280a926392680` (`interfaceId`),
ADD
  KEY `FK_43c394addfc4d9bd8702172346b` (`moduleId`),
ADD
  KEY `FK_5b06d0ee657d822d57f8f8d51c4` (`repositoryId`),
ADD
  KEY `FK_9abf46a04e91c9143c8ee2f8d31` (`parentId`);
--
  -- 表的索引`repository`
  --
ALTER TABLE
  `repository`
ADD
  PRIMARY KEY (`id`),
ADD
  KEY `FK_d04349e128903a18696f51cfe3c` (`creatorId`),
ADD
  KEY `FK_36ca13d9e734f9e2d02b0476d68` (`ownerId`),
ADD
  KEY `FK_88634adf5e9156ea9a36d827c56` (`organizationId`);
--
  -- 表的索引`repository_members_user`
  --
ALTER TABLE
  `repository_members_user`
ADD
  PRIMARY KEY (`repositoryId`, `userId`),
ADD
  KEY `IDX_d505b26d2697b715eab7e43e9b` (`repositoryId`),
ADD
  KEY `IDX_ddc3314438b56d082022cef682` (`userId`);
--
  -- 表的索引`user`
  --
ALTER TABLE
  `user`
ADD
  PRIMARY KEY (`id`),
ADD
  UNIQUE KEY `IDX_d82ac8613a7ccbd2669896ecc8` (`fullname`),
ADD
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);
--
  -- 在导出的表使用AUTO_INCREMENT
  --
  --
  -- 使用表AUTO_INCREMENT `interface`
  --
ALTER TABLE
  `interface`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- 使用表AUTO_INCREMENT `module`
  --
ALTER TABLE
  `module`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- 使用表AUTO_INCREMENT `organization`
  --
ALTER TABLE
  `organization`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- 使用表AUTO_INCREMENT `property`
  --
ALTER TABLE
  `property`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- 使用表AUTO_INCREMENT `repository`
  --
ALTER TABLE
  `repository`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- 使用表AUTO_INCREMENT `user`
  --
ALTER TABLE
  `user`
MODIFY
  `id` int(11) NOT NULL AUTO_INCREMENT;
--
  -- 限制导出的表
  --
  --
  -- 限制表`interface`
  --
ALTER TABLE
  `interface`
ADD
  CONSTRAINT `FK_20a54ebe51a2b5ea077bc3b51bd` FOREIGN KEY (`lockerId`) REFERENCES `user` (`id`),
ADD
  CONSTRAINT `FK_653c7c59f0c094d534acf40cd4e` FOREIGN KEY (`moduleId`) REFERENCES `module` (`id`),
ADD
  CONSTRAINT `FK_861f12d9b4cabf52f7f201a5de6` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`),
ADD
  CONSTRAINT `FK_f9c4e0ecfeb52e7d58175765dec` FOREIGN KEY (`repositoryId`) REFERENCES `repository` (`id`);
--
  -- 限制表`module`
  --
ALTER TABLE
  `module`
ADD
  CONSTRAINT `FK_04596c4e5ae737a08d76f9f0f15` FOREIGN KEY (`repositoryId`) REFERENCES `repository` (`id`),
ADD
  CONSTRAINT `FK_1a96608338d33b3b71285961206` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`);
--
  -- 限制表`organization`
  --
ALTER TABLE
  `organization`
ADD
  CONSTRAINT `FK_221ca61526d7f786a4c4a46e59b` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`),
ADD
  CONSTRAINT `FK_67c515257c7a4bc221bb1857a39` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`);
--
  -- 限制表`organization_members_user`
  --
ALTER TABLE
  `organization_members_user`
ADD
  CONSTRAINT `FK_843397c8844ae95ab56fc627b80` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE CASCADE,
ADD
  CONSTRAINT `FK_db746d1355b95ce189081f816d4` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
--
  -- 限制表`property`
  --
ALTER TABLE
  `property`
ADD
  CONSTRAINT `FK_1e24e999294403280a926392680` FOREIGN KEY (`interfaceId`) REFERENCES `interface` (`id`),
ADD
  CONSTRAINT `FK_43c394addfc4d9bd8702172346b` FOREIGN KEY (`moduleId`) REFERENCES `module` (`id`),
ADD
  CONSTRAINT `FK_5b06d0ee657d822d57f8f8d51c4` FOREIGN KEY (`repositoryId`) REFERENCES `repository` (`id`),
ADD
  CONSTRAINT `FK_9abf46a04e91c9143c8ee2f8d31` FOREIGN KEY (`parentId`) REFERENCES `property` (`id`),
ADD
  CONSTRAINT `FK_ed7d5833a29c7b1ac4e17e3906b` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`);
--
  -- 限制表`repository`
  --
ALTER TABLE
  `repository`
ADD
  CONSTRAINT `FK_36ca13d9e734f9e2d02b0476d68` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`),
ADD
  CONSTRAINT `FK_88634adf5e9156ea9a36d827c56` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`),
ADD
  CONSTRAINT `FK_d04349e128903a18696f51cfe3c` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`);
--
  -- 限制表`repository_members_user`
  --
ALTER TABLE
  `repository_members_user`
ADD
  CONSTRAINT `FK_d505b26d2697b715eab7e43e9b3` FOREIGN KEY (`repositoryId`) REFERENCES `repository` (`id`) ON DELETE CASCADE,
ADD
  CONSTRAINT `FK_ddc3314438b56d082022cef6826` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
