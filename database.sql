CREATE TABLE tai_khoan(
id_tk INT,
ten VARCHAR(30),
mat_khau VARCHAR(20),
so_du INT,
PRIMARY KEY(id_tk)
);
CREATE TABLE tai_khoan_tiet_kiem(
id_tk_tiet_kiem INT,
ten VARCHAR(30),
tien_tiet_kiem INT,
PRIMARY KEY(id_tk_tiet_kiem)
);
CREATE TABLE danh_sach_no(
id_no INT,
id_chu_no INT,
id_nguoi_no INT,
so_tien INT,
PRIMARY KEY(id_no)
);

INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (1,'Tan','12345',100000);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (2,'Duc','54321',200000);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (3,'Hau','12345',300000);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (4,'Nam','dftww23',13446565);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (5,'John','dfdffdfd',1787923);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (6,'Nam','dhgh56',8989828);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (7,'Alex','dsd7',144544);
INSERT INTO tai_khoan (id_tk,ten,mat_khau,so_du) VALUES (8,'Atatur','ss123rr',32235676);

INSERT INTO tai_khoan_tiet_kiem(id_tk_tiet_kiem,ten,tien_tiet_kiem) VALUES (1,'Tan',19988);
INSERT INTO tai_khoan_tiet_kiem(id_tk_tiet_kiem,ten,tien_tiet_kiem) VALUES (2,'Duc',32323);
INSERT INTO tai_khoan_tiet_kiem(id_tk_tiet_kiem,ten,tien_tiet_kiem) VALUES (3,'Hau',19988);
INSERT INTO tai_khoan_tiet_kiem(id_tk_tiet_kiem,ten,tien_tiet_kiem) VALUES (4,'Tan',13434);

INSERT INTO danh_sach_no( id_no,id_chu_no,id_nguoi_no,so_tien) VALUES ( 1,2,3,13333);
INSERT INTO danh_sach_no( id_no,id_chu_no,id_nguoi_no,so_tien) VALUES ( 2,3,4,323);
INSERT INTO danh_sach_no( id_no,id_chu_no,id_nguoi_no,so_tien) VALUES ( 3,4,5,132323);