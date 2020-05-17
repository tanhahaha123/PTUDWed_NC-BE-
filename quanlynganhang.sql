-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: quanlynganhang
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `cap_quyen`
--

DROP TABLE IF EXISTS `cap_quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cap_quyen` (
  `idCapQuyen` int NOT NULL AUTO_INCREMENT,
  `idNhanVien` int NOT NULL,
  `TenQuyen` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChoPhep` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idCapQuyen`),
  KEY `fk_CapQuyen_TaiKhoanNhanVien_idx` (`idNhanVien`),
  CONSTRAINT `fk_CapQuyen_TaiKhoanNhanVien` FOREIGN KEY (`idNhanVien`) REFERENCES `tai_khoan_nhan_vien` (`idTaiKhoanNhanVien`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cap_quyen`
--

LOCK TABLES `cap_quyen` WRITE;
/*!40000 ALTER TABLE `cap_quyen` DISABLE KEYS */;
INSERT INTO `cap_quyen` VALUES (1,1,'TaoTaiKhoanKhachHang',1),(2,1,'NapTienVaoTaiKhoan',1),(3,1,'XemLichSuGiaoDich',1),(4,1,'QuanLyDanhSachNhanVien',0),(5,1,'XemGiaoDichCuaNganHangKhac',0),(6,2,'TaoTaiKhoanKhachHang',1),(7,2,'NapTienVaoTaiKhoan',1),(8,2,'XemLichSuGiaoDich',1),(9,2,'QuanLyDanhSachNhanVien',0),(10,2,'XemGiaoDichCuaNganHangKhac',0);
/*!40000 ALTER TABLE `cap_quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_sach_nguoi_nhan`
--

DROP TABLE IF EXISTS `danh_sach_nguoi_nhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_sach_nguoi_nhan` (
  `idDanhSachNguoiNhan` int NOT NULL AUTO_INCREMENT,
  `TenGoiNho` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiNhan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenNganHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChiNhanhMo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SoTaiKhoan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idDanhSachNguoiNhan`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_sach_nguoi_nhan`
--

LOCK TABLES `danh_sach_nguoi_nhan` WRITE;
/*!40000 ALTER TABLE `danh_sach_nguoi_nhan` DISABLE KEYS */;
INSERT INTO `danh_sach_nguoi_nhan` VALUES (7,'nhan vien Dung','123123123','25Bank','25Bank Bà Triệu','147147147'),(8,'chu phong tro','258258258','25Bank','','147147147'),(9,'doi tac lam an','201201201','AGRIBANK',NULL,'147147147'),(10,'sep','147147147','25Bank',NULL,'123123123'),(11,'khach Phuong thue phong','147147147','25Bank',NULL,'258258258'),(12,'cung cap thuc pham','201201201','AGRIBANK',NULL,'258258258');
/*!40000 ALTER TABLE `danh_sach_nguoi_nhan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giao_dich_nhac_no`
--

DROP TABLE IF EXISTS `giao_dich_nhac_no`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giao_dich_nhac_no` (
  `idGiaoDichNhacNo` int NOT NULL AUTO_INCREMENT,
  `MaGiaoDichNhacNo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiNhan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayGiaoDich` date NOT NULL,
  `SoTien` bigint NOT NULL,
  `NoiDung` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LoaiGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TinhTrangXuLy` tinyint(1) NOT NULL,
  PRIMARY KEY (`idGiaoDichNhacNo`),
  KEY `fk_GiaoDichNhacNo_TaiKhoanNganHangSender_idx` (`SoTaiKhoanNguoiGui`),
  KEY `fk_GiaoDichNhacNo_TaiKhoanNganHangReceiver_idx` (`SoTaiKhoanNguoiNhan`),
  CONSTRAINT `fk_GiaoDichNhacNo_TaiKhoanNganHangReceiver` FOREIGN KEY (`SoTaiKhoanNguoiNhan`) REFERENCES `tai_khoan_ngan_hang` (`SoTaiKhoan`),
  CONSTRAINT `fk_GiaoDichNhacNo_TaiKhoanNganHangSender` FOREIGN KEY (`SoTaiKhoanNguoiGui`) REFERENCES `tai_khoan_ngan_hang` (`SoTaiKhoan`),
  CONSTRAINT `giao_dich_nhac_no_chk_1` CHECK ((`LoaiGiaoDich` in ('đã tạo','đã hủy','đã thanh toán')))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giao_dich_nhac_no`
--

LOCK TABLES `giao_dich_nhac_no` WRITE;
/*!40000 ALTER TABLE `giao_dich_nhac_no` DISABLE KEYS */;
INSERT INTO `giao_dich_nhac_no` VALUES (7,'123123123_56485852','123123123','258258258','2020-05-01',250000,'nho tra no','đã tạo',1),(8,'123123123_56485852','258258258','123123123','2020-05-02',1000000,'toi khong no','đã hủy',1),(9,'123123123_81456536','123123123','147147147','2020-05-03',500000,'tra tien di','đã tạo',1),(10,'147147147_88964521','147147147','123123123','2020-05-04',1250000,'no tien phong','đã tạo',0),(11,'258258258_91455552','258258258','147147147','2020-05-05',3000000,'no tien luong','đã tạo',0),(12,'123123123_81456536','147147147','123123123','2020-05-06',6500000,'tra roi nhe','đã thanh toán',1);
/*!40000 ALTER TABLE `giao_dich_nhac_no` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_giao_dich`
--

DROP TABLE IF EXISTS `lich_su_giao_dich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_giao_dich` (
  `idLichSuGiaoDich` int NOT NULL AUTO_INCREMENT,
  `SoTaiKhoanGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayGiaoDich` date NOT NULL,
  `SoTien` bigint NOT NULL,
  `NoiDung` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ThongTinNguoiGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LienNganHang` tinyint(1) NOT NULL,
  `TenNganHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `LoaiGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idLichSuGiaoDich`),
  KEY `fk_LichSuGiaoDich_TaiKhoanNganHang_idx` (`SoTaiKhoanGiaoDich`),
  CONSTRAINT `fk_LichSuGiaoDich_TaiKhoanNganHang` FOREIGN KEY (`SoTaiKhoanGiaoDich`) REFERENCES `tai_khoan_ngan_hang` (`SoTaiKhoan`),
  CONSTRAINT `lich_su_giao_dich_chk_1` CHECK ((`LoaiGiaoDich` in ('nhận tiền','chuyển khoản')))
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_giao_dich`
--

LOCK TABLES `lich_su_giao_dich` WRITE;
/*!40000 ALTER TABLE `lich_su_giao_dich` DISABLE KEYS */;
INSERT INTO `lich_su_giao_dich` VALUES (3,'258258258','2020-02-01',200000,'Nop tien vao tai khoan','','Trần Văn Nam 0987541021',0,'','nhận tiền'),(4,'258258258','2020-02-01',1000000,'Coc hang 1','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','chuyển khoản'),(5,'258258258','2020-02-01',200000,'cho muon','147147147','NGUYEN VAN THANH',0,NULL,'nhận tiền'),(6,'258258258','2020-02-01',50000,'cho muon','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','nhận tiền'),(7,'258258258','2020-02-01',16000000,'Tra tien dien thang 3','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','nhận tiền'),(8,'258258258','2020-02-01',3000000,'cho muon','123123123','BUI TIEN DUNG',0,NULL,'nhận tiền'),(9,'147147147','2020-02-01',3500000,'cho muon','123123123','BUI TIEN DUNG',0,NULL,'chuyển khoản'),(10,'147147147','2020-02-01',1000000,'coc hang 2','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','chuyển khoản'),(11,'147147147','2020-02-01',5000000,'cho muon','123123123','BUI TIEN DUNG',0,NULL,'chuyển khoản'),(12,'123123123','2020-02-01',1200000,'cho muon','258258258','DANG VAN LAM',0,NULL,'nhận tiền'),(13,'123123123','2020-02-01',10000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'nhận tiền'),(14,'123123123','2020-02-01',3000000,'coc hang 3','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','nhận tiền'),(15,'258258258','2020-02-01',3000000,'cho muon','123123123','BUI TIEN DUNG',0,NULL,'chuyển khoản'),(16,'123123123','2020-02-01',3000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'nhận tiền'),(17,'147147147','2020-02-01',3000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'chuyển khoản'),(18,'147147147','2020-02-01',3000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'chuyển khoản'),(19,'147147147','2020-02-01',3000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'nhận tiền'),(20,'147147147','2020-02-01',3000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'nhận tiền'),(21,'123123123','2020-02-01',3000000,'coc hang 4','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','nhận tiền'),(22,'123123123','2020-02-01',3000000,'coc hang 5','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','chuyển khoản'),(23,'123123123','2020-02-01',3000000,'coc hang 6','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','chuyển khoản'),(24,'123123123','2020-02-01',3000000,'cho muon','258258258','DANG VAN LAM',0,NULL,'chuyển khoản'),(25,'258258258','2020-02-01',3000000,'cho muon','123123123','BUI TIEN DUNG',0,NULL,'chuyển khoản'),(26,'147147147','2020-02-01',3000000,'coc hang 7','201201201','NGUYEN ANH TU_AGRIBANK',1,'AGRIBANK','nhận tiền');
/*!40000 ALTER TABLE `lich_su_giao_dich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ngan_hang_liet_ket`
--

DROP TABLE IF EXISTS `ngan_hang_liet_ket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ngan_hang_liet_ket` (
  `idNganHangLienKet` int NOT NULL AUTO_INCREMENT,
  `TenNganHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`idNganHangLienKet`),
  UNIQUE KEY `TenNganHang` (`TenNganHang`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ngan_hang_liet_ket`
--

LOCK TABLES `ngan_hang_liet_ket` WRITE;
/*!40000 ALTER TABLE `ngan_hang_liet_ket` DISABLE KEYS */;
INSERT INTO `ngan_hang_liet_ket` VALUES (1,'AGRIBANK');
/*!40000 ALTER TABLE `ngan_hang_liet_ket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_khach_hang`
--

DROP TABLE IF EXISTS `tai_khoan_khach_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_khach_hang` (
  `idTaiKhoanKhachHang` int NOT NULL AUTO_INCREMENT,
  `TenDangNhap` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  `MatKhau` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoDienThoai` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenKhachHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GioiTinh` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoCMND` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  `NgaySinh` date NOT NULL,
  `DiaChi` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChiNhanhMo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgheNghiep` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ChucVu` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `GhiChu` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`idTaiKhoanKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_khach_hang`
--

LOCK TABLES `tai_khoan_khach_hang` WRITE;
/*!40000 ALTER TABLE `tai_khoan_khach_hang` DISABLE KEYS */;
INSERT INTO `tai_khoan_khach_hang` VALUES (1,'myaccount1','123456','myaccount1@gmail.com','0978954758','Nguyễn Công Phượng','Nam','189665478','2008-11-11','606/37 Đường Ba Tháng Hai, Phường Từ Liêm, Tp. Hà Nội','25Bank Hồ Tùng Mậu',NULL,NULL,NULL),(2,'myaccount2','123456','myaccount2@gmail.com','0975465287','Bùi Tiến Dũng','Nam','187445696','1989-04-30','123/456 Nguyễn Du, Phường 6, Quận 1, TP. Hồ Chí Minh','25Bank Quận 1','Sinh Viên','Sinh Viên',NULL),(3,'myaccount3','123456','myaccount3@gmail.com','0395874693','Đặng Văn Lâm','Nam','146699568','1990-12-03','153 Võ Thị Sáu, Phường 12, Quận Gò Vấp, Tp. Hồ Chí Minh','25Bank Gò Vấp','',NULL,NULL);
/*!40000 ALTER TABLE `tai_khoan_khach_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_ngan_hang`
--

DROP TABLE IF EXISTS `tai_khoan_ngan_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_ngan_hang` (
  `idTaiKhoanNganHang` int NOT NULL AUTO_INCREMENT,
  `SoTaiKhoan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LoaiTaiKhoan` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `idTaiKhoanKhachHang` int NOT NULL,
  PRIMARY KEY (`idTaiKhoanNganHang`),
  UNIQUE KEY `SoTaiKhoan` (`SoTaiKhoan`),
  KEY `fk_TaiKhoanNganHang_TaiKhoanKhachHang_idx` (`idTaiKhoanKhachHang`),
  CONSTRAINT `fk_TaiKhoanNganHang_TaiKhoanKhachHang` FOREIGN KEY (`idTaiKhoanKhachHang`) REFERENCES `tai_khoan_khach_hang` (`idTaiKhoanKhachHang`),
  CONSTRAINT `tai_khoan_ngan_hang_chk_1` CHECK ((`LoaiTaiKhoan` in ('thanh toán','tiết kiệm')))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_ngan_hang`
--

LOCK TABLES `tai_khoan_ngan_hang` WRITE;
/*!40000 ALTER TABLE `tai_khoan_ngan_hang` DISABLE KEYS */;
INSERT INTO `tai_khoan_ngan_hang` VALUES (9,'123123123','thanh toán',2),(10,'456456456','tiết kiệm',2),(11,'147147147','thanh toán',1),(12,'258258258','thanh toán',3),(13,'369369369','tiết kiệm',3),(14,'789789789','tiết kiệm',2),(15,'321321321','tiết kiệm',2),(16,'654654654','tiết kiệm',1),(17,'987987987','tiết kiệm',1),(18,'000111222','tiết kiệm',2);
/*!40000 ALTER TABLE `tai_khoan_ngan_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_nhan_vien`
--

DROP TABLE IF EXISTS `tai_khoan_nhan_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_nhan_vien` (
  `idTaiKhoanNhanVien` int NOT NULL AUTO_INCREMENT,
  `TenDangNhap` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  `MatKhau` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoDienThoai` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenNhanVien` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GioiTinh` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoCMND` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  `NgaySinh` date NOT NULL,
  `DiaChi` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChucVu` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GhiChu` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`idTaiKhoanNhanVien`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_nhan_vien`
--

LOCK TABLES `tai_khoan_nhan_vien` WRITE;
/*!40000 ALTER TABLE `tai_khoan_nhan_vien` DISABLE KEYS */;
INSERT INTO `tai_khoan_nhan_vien` VALUES (1,'accountnhanvien1','123456','accountnhanvien1@gmail.com','0394587454','Nguyễn Thị Hà','Nữ','145885696','2000-02-02','136 Ha Bà Trưng, Phường 2, Quận Thủ Đức, Tp. Hồ Chí Minh','Giao Dịch Viên',NULL),(2,'accountnhanvien2','123456','accountnhanvien2@gmail.com','0974525412','Nguyễn Văn Tú','Nam','165554412','1995-06-03','23 Xa Lộ Hà Nội, Phường 8, Quận Thủ Đức, Tp. Hồ Chí Minh','Giao Dịch Viên',NULL);
/*!40000 ALTER TABLE `tai_khoan_nhan_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_thanh_toan`
--

DROP TABLE IF EXISTS `tai_khoan_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_thanh_toan` (
  `idTaiKhoanThanhToan` int NOT NULL AUTO_INCREMENT,
  `SoTaiKhoanThanhToan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  `SoDu` bigint NOT NULL,
  PRIMARY KEY (`idTaiKhoanThanhToan`),
  KEY `fk_TaiKhoanThanhToan_TaiKhoanNganHang_idx` (`SoTaiKhoanThanhToan`),
  CONSTRAINT `fk_TaiKhoanThanhToan_TaiKhoanNganHang` FOREIGN KEY (`SoTaiKhoanThanhToan`) REFERENCES `tai_khoan_ngan_hang` (`SoTaiKhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_thanh_toan`
--

LOCK TABLES `tai_khoan_thanh_toan` WRITE;
/*!40000 ALTER TABLE `tai_khoan_thanh_toan` DISABLE KEYS */;
INSERT INTO `tai_khoan_thanh_toan` VALUES (1,'123123123',1050000),(2,'147147147',50000),(3,'258258258',200000);
/*!40000 ALTER TABLE `tai_khoan_thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_tiet_kiem`
--

DROP TABLE IF EXISTS `tai_khoan_tiet_kiem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_tiet_kiem` (
  `idTaiKhoanTietKiem` int NOT NULL AUTO_INCREMENT,
  `SoTaiKhoanTietKiem` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
  `SoDu` bigint NOT NULL,
  `NgayGui` date NOT NULL,
  `KyHanGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayHetHan` date NOT NULL,
  `LaiSuat` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`idTaiKhoanTietKiem`),
  KEY `fk_TaiKhoanTietKiem_TaiKhoanNganHang_idx` (`SoTaiKhoanTietKiem`),
  CONSTRAINT `fk_TaiKhoanTietKiem_TaiKhoanNganHang` FOREIGN KEY (`SoTaiKhoanTietKiem`) REFERENCES `tai_khoan_ngan_hang` (`SoTaiKhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_tiet_kiem`
--

LOCK TABLES `tai_khoan_tiet_kiem` WRITE;
/*!40000 ALTER TABLE `tai_khoan_tiet_kiem` DISABLE KEYS */;
INSERT INTO `tai_khoan_tiet_kiem` VALUES (7,'654654654',2000000,'2020-04-30','1 tuần','2020-05-07','2%'),(8,'987987987',1000000,'2020-02-01','6 tháng','2020-08-01','3.3%'),(9,'456456456',15000000,'2020-03-05','1 tháng','2020-04-05','2.5%'),(10,'369369369',500000,'2020-03-12','2 tuần','2020-03-28','2%'),(11,'789789789',2500000,'2020-03-15','1 tuần','2020-03-22','2%'),(12,'321321321',6000000,'2020-04-01','12 tháng','2021-04-01','3.6%'),(13,'000111222',19000000,'2020-05-15','36 tháng','2023-05-15','5%');
/*!40000 ALTER TABLE `tai_khoan_tiet_kiem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-17  7:23:51
