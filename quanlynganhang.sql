-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th6 15, 2020 lúc 04:35 AM
-- Phiên bản máy phục vụ: 8.0.13-4
-- Phiên bản PHP: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `7zwzyanesh`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cap_quyen`
--

-- CREATE TABLE `cap_quyen` (
--   `idCapQuyen` int(11) NOT NULL,
--   `idNhanVien` int(11) NOT NULL,
--   `TenQuyen` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
--   `ChoPhep` tinyint(1) NOT NULL DEFAULT '0'
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `cap_quyen`
--

-- INSERT INTO `cap_quyen` (`idCapQuyen`, `idNhanVien`, `TenQuyen`, `ChoPhep`) VALUES
-- (1, 1, 'TaoTaiKhoanKhachHang', 1),
-- (2, 1, 'NapTienVaoTaiKhoan', 1),
-- (3, 1, 'XemLichSuGiaoDich', 1),
-- (4, 1, 'QuanLyDanhSachNhanVien', 0),
-- (5, 1, 'XemGiaoDichCuaNganHangKhac', 0),
-- (6, 2, 'TaoTaiKhoanKhachHang', 1),
-- (7, 2, 'NapTienVaoTaiKhoan', 1),
-- (8, 2, 'XemLichSuGiaoDich', 1),
-- (9, 2, 'QuanLyDanhSachNhanVien', 0),
-- (10, 2, 'XemGiaoDichCuaNganHangKhac', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_sach_nguoi_nhan`
--

CREATE TABLE `danh_sach_nguoi_nhan` (
  `idDanhSachNguoiNhan` int(11) NOT NULL,
  `TenGoiNho` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiNhan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenNganHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChiNhanhMo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SoTaiKhoan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `danh_sach_nguoi_nhan`
--

INSERT INTO `danh_sach_nguoi_nhan` (`idDanhSachNguoiNhan`, `TenGoiNho`, `SoTaiKhoanNguoiNhan`, `TenNganHang`, `ChiNhanhMo`, `SoTaiKhoan`) VALUES
(7, 'Bùi Tiến Dũng', '123123123', '25Bank', '25Bank Bà Triệu', '147147147'),
(9, 'doi tac lam an', '201201201', 'AGRIBANK', NULL, '147147147'),
(10, 'sep', '147147147', '25Bank', NULL, '123123123'),
(11, 'khach Phuong thue phong', '147147147', '25Bank', NULL, '258258258'),
(12, 'cung cap thuc pham', '201201201', 'AGRIBANK', NULL, '258258258'),
(16, 'Bùi Tiến Dũng', '123123123', '25Bank', NULL, '147147147');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giao_dich_nhac_no`
--

CREATE TABLE `giao_dich_nhac_no` (
  `idGiaoDichNhacNo` int(11) NOT NULL,
  `MaGiaoDichNhacNo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanNguoiNhan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayGiaoDich` datetime(3) NOT NULL,
  `SoTien` bigint(20) NOT NULL,
  `NoiDung` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LoaiGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TinhTrangXuLy` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `giao_dich_nhac_no`
--

INSERT INTO `giao_dich_nhac_no` (`idGiaoDichNhacNo`, `MaGiaoDichNhacNo`, `SoTaiKhoanNguoiGui`, `SoTaiKhoanNguoiNhan`, `NgayGiaoDich`, `SoTien`, `NoiDung`, `LoaiGiaoDich`, `TinhTrangXuLy`) VALUES
(7, '123123123_56485852', '123123123', '258258258', '2020-05-01 00:00:00.000', 250000, 'nho tra no', 'đã tạo', 1),
(8, '123123123_56485852', '258258258', '123123123', '2020-05-02 00:00:00.000', 1000000, 'toi khong no', 'đã hủy', 1),
(9, '123123123_81456536', '123123123', '147147147', '2020-05-03 00:00:00.000', 500000, 'tra tien di', 'đã tạo', 1),
(10, '147147147_88964521', '147147147', '123123123', '2020-05-04 00:00:00.000', 1250000, 'no tien phong', 'đã tạo', 0),
(11, '258258258_91455552', '258258258', '147147147', '2020-05-05 00:00:00.000', 3000000, 'no tien luong', 'đã tạo', 0),
(12, '123123123_81456536', '147147147', '123123123', '2020-05-06 00:00:00.000', 6500000, 'tra roi nhe', 'đã thanh toán', 1),
(19, '123123123_258258258', '123123123', '258258258', '2020-06-09 19:48:01.372', 500000, 'Yeu cau tra no', 'da tao', 1),
(20, '123123123_258258258', '123123123', '258258258', '2020-06-09 20:46:27.881', 500000, 'Yeu cau tra no', 'da tao', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_su_giao_dich`
--

CREATE TABLE `lich_su_giao_dich` (
  `idLichSuGiaoDich` int(11) NOT NULL,
  `MaGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoTaiKhoanGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayGiaoDich` datetime(3) NOT NULL,
  `SoTien` bigint(20) NOT NULL,
  `NoiDung` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GiaoDichVoiSoTK` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ThongTinNguoiGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LienNganHang` tinyint(1) NOT NULL,
  `TenNganHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `LoaiGiaoDich` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_su_giao_dich`
--

INSERT INTO `lich_su_giao_dich` (`idLichSuGiaoDich`, `MaGiaoDich`, `SoTaiKhoanGiaoDich`, `NgayGiaoDich`, `SoTien`, `NoiDung`, `GiaoDichVoiSoTK`, `ThongTinNguoiGui`, `LienNganHang`, `TenNganHang`, `LoaiGiaoDich`) VALUES
(3, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 200000, 'Nop tien vao tai khoan', '', 'Trần Văn Nam 0987541021', 0, '', 'nhận tiền'),
(4, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 1000000, 'Coc hang 1', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'chuyển khoản'),
(5, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 200000, 'cho muon', '147147147', 'NGUYEN VAN THANH', 0, NULL, 'nhận tiền'),
(6, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 50000, 'cho muon', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'nhận tiền'),
(7, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 16000000, 'Tra tien dien thang 3', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'nhận tiền'),
(8, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '123123123', 'BUI TIEN DUNG', 0, NULL, 'nhận tiền'),
(9, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 3500000, 'cho muon', '123123123', 'BUI TIEN DUNG', 0, NULL, 'chuyển khoản'),
(10, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 1000000, 'coc hang 2', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'chuyển khoản'),
(11, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 5000000, 'cho muon', '123123123', 'BUI TIEN DUNG', 0, NULL, 'chuyển khoản'),
(12, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 1200000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'nhận tiền'),
(13, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 10000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'nhận tiền'),
(14, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 3000000, 'coc hang 3', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'nhận tiền'),
(15, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '123123123', 'BUI TIEN DUNG', 0, NULL, 'chuyển khoản'),
(16, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'nhận tiền'),
(17, '147147147_1589881212570', '147147147', '2019-02-01 00:00:00.000', 3000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'chuyển khoản'),
(18, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'chuyển khoản'),
(19, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'nhận tiền'),
(20, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'nhận tiền'),
(21, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 3000000, 'coc hang 4', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'nhận tiền'),
(22, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 3000000, 'coc hang 5', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'chuyển khoản'),
(23, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 3000000, 'coc hang 6', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'chuyển khoản'),
(24, '123123123_1589881212570', '123123123', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '258258258', 'DANG VAN LAM', 0, NULL, 'chuyển khoản'),
(25, '258258258_1589881212570', '258258258', '2020-02-01 00:00:00.000', 3000000, 'cho muon', '123123123', 'BUI TIEN DUNG', 0, NULL, 'chuyển khoản'),
(26, '147147147_1589881212570', '147147147', '2020-02-01 00:00:00.000', 3000000, 'coc hang 7', '201201201', 'NGUYEN ANH TU_AGRIBANK', 1, 'AGRIBANK', 'nhận tiền'),
(27, '147147147_1590421142601', '147147147', '2020-05-25 15:39:34.452', 500000, 'trả tiền mượn tháng ba', '230500001', 'Nguyễn Minh Thông', 1, 'GO', 'nhận tiền'),
(28, '147147147_1590421326287', '147147147', '2020-05-25 15:42:34.484', 500000, 'trả tiền mượn tháng ba', '230500001', 'Nguyễn Minh Thông', 1, 'GO', 'nhận tiền'),
(31, '258258258_1590442457365', '258258258', '2020-05-26 04:34:30.797', 50000, 'thanh toán tiền phòng', '230500002', 'Phạm Đình Sỹ', 1, 'GO', 'chuyển khoản'),
(32, '147147147_1590505848130', '147147147', '2019-05-26 15:10:50.932', 3000, 'Topup', '123', '37Bank', 1, '37Bank', 'thanh toán nợ'),
(33, '123123123_1591951499490', '123123123', '2020-06-12 15:44:59.490', 10000, 'chuyen tien', NULL, 'Tran Van Dung', 0, NULL, 'nhận tiền'),
(34, '654654654_1591952097376', '654654654', '2020-06-12 15:54:57.377', 100000, 'chuyen tien', NULL, 'Tran Van Dung', 0, NULL, 'nhận tiền'),
(35, '987987987_1591968420833', '987987987', '2020-06-12 20:27:00.833', 100000, 'chuyen tien', NULL, 'Tran Dan', 0, NULL, 'nhận tiền'),
(36, '147147147_1591968552990', '147147147', '2020-06-12 20:29:12.990', 100000, 'chuyen tien', NULL, 'Tran Dan', 0, NULL, 'nhận tiền');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ngan_hang_lien_ket`
--

CREATE TABLE `ngan_hang_lien_ket` (
  `idNganHangLienKet` int(11) NOT NULL,
  `TenNganHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `ngan_hang_lien_ket`
--

INSERT INTO `ngan_hang_lien_ket` (`idNganHangLienKet`, `TenNganHang`) VALUES
(1, 'AGRIBANK'),
(2, 'GO'),
(3, '37Bank');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan_khach_hang`
--

CREATE TABLE `tai_khoan_khach_hang` (
  `idTaiKhoanKhachHang` int(11) NOT NULL,
  `TenDangNhap` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MatKhau` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoDienThoai` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenKhachHang` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GioiTinh` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoCMND` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgaySinh` date NOT NULL,
  `DiaChi` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChiNhanhMo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgheNghiep` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ChucVu` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `GhiChu` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan_khach_hang`
--

INSERT INTO `tai_khoan_khach_hang` (`idTaiKhoanKhachHang`, `TenDangNhap`, `MatKhau`, `Email`, `SoDienThoai`, `TenKhachHang`, `GioiTinh`, `SoCMND`, `NgaySinh`, `DiaChi`, `ChiNhanhMo`, `NgheNghiep`, `ChucVu`, `GhiChu`) VALUES
(1, 'myaccount1', '123456', 'myaccount1@gmail.com', '0978954758', 'Nguyễn Công Phượng', 'Nam', '189665478', '2008-11-11', '606/37 Đường Ba Tháng Hai, Phường Từ Liêm, Tp. Hà Nội', '25Bank Hồ Tùng Mậu', NULL, NULL, NULL),
(2, 'myaccount2', '123456', 'myaccount2@gmail.com', '0975465287', 'Bùi Tiến Dũng', 'Nam', '187445696', '1989-04-30', '123/456 Nguyễn Du, Phường 6, Quận 1, TP. Hồ Chí Minh', '25Bank Quận 1', 'Sinh Viên', 'Sinh Viên', NULL),
(3, 'myaccount3', '123456', 'myaccount3@gmail.com', '0395874693', 'Đặng Văn Lâm', 'Nam', '146699568', '1990-12-03', '153 Võ Thị Sáu, Phường 12, Quận Gò Vấp, Tp. Hồ Chí Minh', '25Bank Gò Vấp', '', NULL, NULL),
(13, 'xyz3jean', 'jdjfdtyu', 'jeantheuser@gmail.com', '095637815', 'Jean Tran', 'Nữ', '285647834', '1990-12-19', '756 Võ Thị Sáu, Phường 12, Quận Gò Vấp, Tp. Hồ Chí Minh', '25Bank Gò Vấp', 'Nhà báo', '', ''),
(16, 'tyuHoang', '456Hoang', 'hoangtheuser@gmail.com', '0949654345', 'Nguyen Van Hoang', 'Nam', '254678002', '1994-01-19', '857 Võ Thị Sáu, Phường 12, Quận Gò Vấp, Tp. Hồ Chí Minh', '25Bank Gò Vấp', 'Viên Chức', '', ''),
(17, 'myaccount4', '123456', 'myaccount@gmail.com', '0123456789', 'Nguyen Cong Phuong', 'Nam', '212810156', '2020-02-02', 'Quang Ngai', 'abc', NULL, NULL, NULL),
(18, 'yuduuy', 'dfdfs', 'thutheuser@gmail.com', '09563745', 'Tran Thu Huyen', 'Nữ', '354673456', '1991-12-09', '89 Võ Thị Sáu, Phường 12, Quận Gò Vấp, Tp. Hồ Chí Minh', '25Bank Gò Vấp', 'Giáo viên', '', ''),
(19, 'myaccount5', '$2a$08$asm73tBZsVXMrhZCFgsVfehYrmm/TgBlXGo5sYPF/5DuIwLu2Ek0q', 'myaccount5@gmail.com', '0123456789', 'Nguyen Cong Phuong', 'Nam', '212810157', '2020-02-02', 'Quang Ngai', 'abc', NULL, NULL, NULL),
(20, 'myaccount6', '$2a$08$tyOi7Z5EIsEpDZMK0gIHn.UyKHRt/7JpqA1kpbc8hKDeoohoRTAUm', 'myaccount6@gmail.com', '0123456789', 'Nguyen Cong Phuong', 'Nam', '212810158', '2020-02-02', 'Quang Ngai', 'abc', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan_ngan_hang`
--

CREATE TABLE `tai_khoan_ngan_hang` (
  `idTaiKhoanNganHang` int(11) NOT NULL,
  `SoTaiKhoan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `LoaiTaiKhoan` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `idTaiKhoanKhachHang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan_ngan_hang`
--

INSERT INTO `tai_khoan_ngan_hang` (`idTaiKhoanNganHang`, `SoTaiKhoan`, `LoaiTaiKhoan`, `idTaiKhoanKhachHang`) VALUES
(9, '123123123', 'thanh toán', 2),
(10, '456456456', 'tiết kiệm', 2),
(11, '147147147', 'thanh toán', 1),
(12, '258258258', 'thanh toán', 3),
(13, '369369369', 'tiết kiệm', 3),
(14, '789789789', 'tiết kiệm', 2),
(15, '321321321', 'tiết kiệm', 2),
(16, '654654654', 'tiết kiệm', 1),
(17, '987987987', 'tiết kiệm', 1),
(18, '000111222', 'tiết kiệm', 2),
(19, '544449817', 'thanh toán', 13),
(21, '937297279', 'thanh toán', 16),
(22, '473761107', 'thanh toán', 18);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan_nhan_vien`
--

CREATE TABLE `tai_khoan_nhan_vien` (
  `idTaiKhoanNhanVien` int(11) NOT NULL,
  `TenDangNhap` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MatKhau` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoDienThoai` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TenNhanVien` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GioiTinh` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoCMND` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgaySinh` date NOT NULL,
  `DiaChi` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ChucVu` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GhiChu` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan_nhan_vien`
--

INSERT INTO `tai_khoan_nhan_vien` (`idTaiKhoanNhanVien`, `TenDangNhap`, `MatKhau`, `Email`, `SoDienThoai`, `TenNhanVien`, `GioiTinh`, `SoCMND`, `NgaySinh`, `DiaChi`, `ChucVu`, `GhiChu`) VALUES
(1, 'accountnhanvien1', '$2a$08$udVtfvqlsy87T8UMLGoewuwmKGr0jrxlMngh/JxUrW5xScL0Qvx1G', 'accountnhanvien1@gmail.com', '0394587454', 'Nguyễn Thị Hà', 'Nữ', '145885696', '2000-02-02', '136 Ha Bà Trưng, Phường 2, Quận Thủ Đức, Tp. Hồ Chí Minh', 'Giao Dịch Viên', NULL),
(2, 'accountnhanvien2', '$2a$08$udVtfvqlsy87T8UMLGoewuwmKGr0jrxlMngh/JxUrW5xScL0Qvx1G', 'accountnhanvien2@gmail.com', '0974525412', 'Nguyễn Văn Tú', 'Nam', '165554412', '1995-06-03', '23 Xa Lộ Hà Nội, Phường 8, Quận Thủ Đức, Tp. Hồ Chí Minh', 'Giao Dịch Viên', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan_thanh_toan`
--

CREATE TABLE `tai_khoan_thanh_toan` (
  `idTaiKhoanThanhToan` int(11) NOT NULL,
  `SoTaiKhoanThanhToan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoDu` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan_thanh_toan`
--

INSERT INTO `tai_khoan_thanh_toan` (`idTaiKhoanThanhToan`, `SoTaiKhoanThanhToan`, `SoDu`) VALUES
(1, '123123123', 100000),
(2, '147147147', 2163000),
(3, '258258258', 50000),
(4, '544449817', 50000),
(5, '937297279', 50000),
(6, '473761107', 50000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan_tiet_kiem`
--

CREATE TABLE `tai_khoan_tiet_kiem` (
  `idTaiKhoanTietKiem` int(11) NOT NULL,
  `SoTaiKhoanTietKiem` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SoDu` bigint(20) NOT NULL,
  `NgayGui` datetime NOT NULL,
  `KyHanGui` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayHetHan` datetime NOT NULL,
  `LaiSuat` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan_tiet_kiem`
--

INSERT INTO `tai_khoan_tiet_kiem` (`idTaiKhoanTietKiem`, `SoTaiKhoanTietKiem`, `SoDu`, `NgayGui`, `KyHanGui`, `NgayHetHan`, `LaiSuat`) VALUES
(7, '654654654', 2100000, '2020-04-30 00:00:00', '1 tuần', '2020-05-07 00:00:00', '2%'),
(8, '987987987', 1100000, '2020-02-01 00:00:00', '6 tháng', '2020-08-01 00:00:00', '3.3%'),
(9, '456456456', 15000000, '2020-03-05 00:00:00', '1 tháng', '2020-04-05 00:00:00', '2.5%'),
(10, '369369369', 500000, '2020-03-12 00:00:00', '2 tuần', '2020-03-28 00:00:00', '2%'),
(11, '789789789', 2500000, '2020-03-15 00:00:00', '1 tuần', '2020-03-22 00:00:00', '2%'),
(12, '321321321', 6000000, '2020-04-01 00:00:00', '12 tháng', '2021-04-01 00:00:00', '3.6%'),
(13, '000111222', 19000000, '2020-05-15 00:00:00', '36 tháng', '2023-05-15 00:00:00', '5%');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otp_code`
--

CREATE TABLE `otp_code` (
  `idOTPCode` int(11) NOT NULL,
  `SoTaiKhoan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `OTPCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ExpireAt` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `forgot_password_otp_code`
--

CREATE TABLE `forgot_password_otp_code` (
  `idForgotPasswordOTPCode` int(11) NOT NULL,
  `TenDangNhap` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `OTPCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ExpireAt` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refresh_token`
--

CREATE TABLE `refresh_token` (
  `idRefreshToken` int(11) NOT NULL,
  `idTaiKhoanKhachHang` int(11) NOT NULL,
  `RefreshToken` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refresh_token`
--

CREATE TABLE `refresh_token_employee` (
  `idRefreshToken` int(11) NOT NULL,
  `idTaiKhoanKhachHang` int(11) NOT NULL,
  `RefreshToken` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cap_quyen`
--
-- ALTER TABLE `cap_quyen`
--   ADD PRIMARY KEY (`idCapQuyen`),
--   ADD KEY `fk_CapQuyen_TaiKhoanNhanVien_idx` (`idNhanVien`);

--
-- Chỉ mục cho bảng `danh_sach_nguoi_nhan`
--
ALTER TABLE `danh_sach_nguoi_nhan`
  ADD PRIMARY KEY (`idDanhSachNguoiNhan`);

--
-- Chỉ mục cho bảng `giao_dich_nhac_no`
--
ALTER TABLE `giao_dich_nhac_no`
  ADD PRIMARY KEY (`idGiaoDichNhacNo`),
  ADD KEY `fk_GiaoDichNhacNo_TaiKhoanNganHangSender_idx` (`SoTaiKhoanNguoiGui`),
  ADD KEY `fk_GiaoDichNhacNo_TaiKhoanNganHangReceiver_idx` (`SoTaiKhoanNguoiNhan`);

--
-- Chỉ mục cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  ADD PRIMARY KEY (`idLichSuGiaoDich`),
  ADD KEY `fk_LichSuGiaoDich_TaiKhoanNganHang_idx` (`SoTaiKhoanGiaoDich`);

--
-- Chỉ mục cho bảng `ngan_hang_lien_ket`
--
ALTER TABLE `ngan_hang_lien_ket`
  ADD UNIQUE KEY `TenNganHang` (`TenNganHang`),
  ADD UNIQUE KEY `idNganHangLienKet` (`idNganHangLienKet`,`TenNganHang`);

--
-- Chỉ mục cho bảng `tai_khoan_khach_hang`
--
ALTER TABLE `tai_khoan_khach_hang`
  ADD PRIMARY KEY (`idTaiKhoanKhachHang`),
  ADD UNIQUE KEY `TenDangNhap` (`TenDangNhap`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `SoCMND` (`SoCMND`);

--
-- Chỉ mục cho bảng `tai_khoan_ngan_hang`
--
ALTER TABLE `tai_khoan_ngan_hang`
  ADD PRIMARY KEY (`idTaiKhoanNganHang`),
  ADD UNIQUE KEY `SoTaiKhoan` (`SoTaiKhoan`),
  ADD KEY `fk_TaiKhoanNganHang_TaiKhoanKhachHang_idx` (`idTaiKhoanKhachHang`);

--
-- Chỉ mục cho bảng `tai_khoan_nhan_vien`
--
ALTER TABLE `tai_khoan_nhan_vien`
  ADD PRIMARY KEY (`idTaiKhoanNhanVien`),
  ADD UNIQUE KEY `TenDangNhap` (`TenDangNhap`),
  ADD UNIQUE KEY `SoCMND` (`SoCMND`);

--
-- Chỉ mục cho bảng `tai_khoan_thanh_toan`
--
ALTER TABLE `tai_khoan_thanh_toan`
  ADD PRIMARY KEY (`idTaiKhoanThanhToan`),
  ADD UNIQUE KEY `SoTaiKhoanThanhToan` (`SoTaiKhoanThanhToan`),
  ADD KEY `fk_TaiKhoanThanhToan_TaiKhoanNganHang_idx` (`SoTaiKhoanThanhToan`);

--
-- Chỉ mục cho bảng `tai_khoan_tiet_kiem`
--
ALTER TABLE `tai_khoan_tiet_kiem`
  ADD PRIMARY KEY (`idTaiKhoanTietKiem`),
  ADD UNIQUE KEY `SoTaiKhoanTietKiem` (`SoTaiKhoanTietKiem`),
  ADD KEY `fk_TaiKhoanTietKiem_TaiKhoanNganHang_idx` (`SoTaiKhoanTietKiem`);

--
-- Chỉ mục cho bảng `otp_code`
--
ALTER TABLE `otp_code`
  ADD PRIMARY KEY (`idOTPCode`),
  ADD KEY `fk_OTPCode_TaiKhoanThanhToan_idx` (`SoTaiKhoan`);
  
--
-- Chỉ mục cho bảng `forgot_password_otp_code`
--
ALTER TABLE `forgot_password_otp_code`
  ADD PRIMARY KEY (`idForgotPasswordOTPCode`),
  ADD KEY `fk_ForgotPasswordOTPCode_TaiKhoanKhachHang_idx` (`Email`);
  
--
-- Chỉ mục cho bảng `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`idRefreshToken`);


--
-- Chỉ mục cho bảng `refresh_token`
--
ALTER TABLE `refresh_token_employee`
  ADD PRIMARY KEY (`idRefreshToken`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cap_quyen`
--
-- ALTER TABLE `cap_quyen`
--   MODIFY `idCapQuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `danh_sach_nguoi_nhan`
--
ALTER TABLE `danh_sach_nguoi_nhan`
  MODIFY `idDanhSachNguoiNhan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `giao_dich_nhac_no`
--
ALTER TABLE `giao_dich_nhac_no`
  MODIFY `idGiaoDichNhacNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  MODIFY `idLichSuGiaoDich` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `ngan_hang_lien_ket`
--
ALTER TABLE `ngan_hang_lien_ket`
  MODIFY `idNganHangLienKet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tai_khoan_khach_hang`
--
ALTER TABLE `tai_khoan_khach_hang`
  MODIFY `idTaiKhoanKhachHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `tai_khoan_ngan_hang`
--
ALTER TABLE `tai_khoan_ngan_hang`
  MODIFY `idTaiKhoanNganHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `tai_khoan_nhan_vien`
--
ALTER TABLE `tai_khoan_nhan_vien`
  MODIFY `idTaiKhoanNhanVien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tai_khoan_thanh_toan`
--
ALTER TABLE `tai_khoan_thanh_toan`
  MODIFY `idTaiKhoanThanhToan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `tai_khoan_tiet_kiem`
--
ALTER TABLE `tai_khoan_tiet_kiem`
  MODIFY `idTaiKhoanTietKiem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `otp_code`
--
ALTER TABLE `otp_code`
  MODIFY `idOTPCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `forgot_password_otp_code`
--
ALTER TABLE `forgot_password_otp_code`
  MODIFY `idForgotPasswordOTPCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `refresh_token`
--

ALTER TABLE `refresh_token`
  MODIFY `idRefreshToken` int(11) NOT NULL AUTO_INCREMENT;
  

--
-- AUTO_INCREMENT cho bảng `refresh_token`
--

ALTER TABLE `refresh_token_employee`
  MODIFY `idRefreshToken` int(11) NOT NULL AUTO_INCREMENT;
  

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cap_quyen`
--
-- ALTER TABLE `cap_quyen`
--   ADD CONSTRAINT `fk_CapQuyen_TaiKhoanNhanVien` FOREIGN KEY (`idNhanVien`) REFERENCES `tai_khoan_nhan_vien` (`idtaikhoannhanvien`);

--
-- Các ràng buộc cho bảng `giao_dich_nhac_no`
--
ALTER TABLE `giao_dich_nhac_no`
  ADD CONSTRAINT `fk_GiaoDichNhacNo_TaiKhoanNganHangReceiver` FOREIGN KEY (`SoTaiKhoanNguoiNhan`) REFERENCES `tai_khoan_ngan_hang` (`sotaikhoan`),
  ADD CONSTRAINT `fk_GiaoDichNhacNo_TaiKhoanNganHangSender` FOREIGN KEY (`SoTaiKhoanNguoiGui`) REFERENCES `tai_khoan_ngan_hang` (`sotaikhoan`);

--
-- Các ràng buộc cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  ADD CONSTRAINT `fk_LichSuGiaoDich_TaiKhoanNganHang` FOREIGN KEY (`SoTaiKhoanGiaoDich`) REFERENCES `tai_khoan_ngan_hang` (`sotaikhoan`);

--
-- Các ràng buộc cho bảng `tai_khoan_ngan_hang`
--
ALTER TABLE `tai_khoan_ngan_hang`
  ADD CONSTRAINT `fk_TaiKhoanNganHang_TaiKhoanKhachHang` FOREIGN KEY (`idTaiKhoanKhachHang`) REFERENCES `tai_khoan_khach_hang` (`idtaikhoankhachhang`);

--
-- Các ràng buộc cho bảng `tai_khoan_thanh_toan`
--
ALTER TABLE `tai_khoan_thanh_toan`
  ADD CONSTRAINT `fk_TaiKhoanThanhToan_TaiKhoanNganHang` FOREIGN KEY (`SoTaiKhoanThanhToan`) REFERENCES `tai_khoan_ngan_hang` (`sotaikhoan`);

--
-- Các ràng buộc cho bảng `tai_khoan_tiet_kiem`
--
ALTER TABLE `tai_khoan_tiet_kiem`
  ADD CONSTRAINT `fk_TaiKhoanTietKiem_TaiKhoanNganHang` FOREIGN KEY (`SoTaiKhoanTietKiem`) REFERENCES `tai_khoan_ngan_hang` (`sotaikhoan`);
  
--
-- Các ràng buộc cho bảng `otp_code`
--
ALTER TABLE `otp_code`
  ADD CONSTRAINT `fk_OTPCode_TaiKhoanThanhToan` FOREIGN KEY (`SoTaiKhoan`) REFERENCES `tai_khoan_thanh_toan` (`sotaikhoanthanhtoan`);
  
--
-- Các ràng buộc cho bảng `forgot_password_otp_code`
--
ALTER TABLE `forgot_password_otp_code`
  ADD CONSTRAINT `fk_ForgotPasswordOTPCode_TaiKhoanKhachHang` FOREIGN KEY (`Email`) REFERENCES `tai_khoan_khach_hang` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
