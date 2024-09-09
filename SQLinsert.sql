USE [BookLand]
GO

-- Inserting data into `admins`
INSERT INTO dbo.admins (name, email, password_hash, password_salt)
VALUES ('Admin Name', 'admin@example.com', CAST('hash' AS varbinary(max)), CAST('salt' AS varbinary(max)));
go

-- Inserting data into `users`
INSERT INTO dbo.users (name, email, password_hash, password_salt, image, address, phone_number, points)
VALUES 
('User One', 'user1@example.com', CAST('hash1' AS varbinary(max)), CAST('salt1' AS varbinary(max)), 'image1.jpg', '1234 Street, City', '123-456-7890', 100),
('User Two', 'user2@example.com', CAST('hash2' AS varbinary(max)), CAST('salt2' AS varbinary(max)), 'image2.jpg', '5678 Avenue, City', '098-765-4321', 200),
('User Three', 'user3@example.com', CAST('hash3' AS varbinary(max)), CAST('salt3' AS varbinary(max)), 'image3.jpg', '9101 Road, City', '555-555-5555', 30),
('User Four', 'user4@example.com', CAST('hash4' AS varbinary(max)), CAST('salt4' AS varbinary(max)), 'image4.jpg', '1112 Lane, City', '222-333-4444', 15),
('User Five', 'user5@example.com', CAST('hash5' AS varbinary(max)), CAST('salt5' AS varbinary(max)), 'image5.jpg', '1314 Court, City', '666-777-8888', 20),
('User Six', 'user6@example.com', CAST('hash6' AS varbinary(max)), CAST('salt6' AS varbinary(max)), 'image6.jpg', '1516 Plaza, City', '888-999-0000', 250),
('User Seven', 'user7@example.com', CAST('hash7' AS varbinary(max)), CAST('salt7' AS varbinary(max)), 'image7.jpg', '1718 Parkway, City', '111-222-3333', 500),
('User Eight', 'user8@example.com', CAST('hash8' AS varbinary(max)), CAST('salt8' AS varbinary(max)), 'image8.jpg', '1920 Boulevard, City', '444-555-6666', 30),
('User Nine', 'user9@example.com', CAST('hash9' AS varbinary(max)), CAST('salt9' AS varbinary(max)), 'image9.jpg', '2122 Street, City', '777-888-9999', 75),
('User Ten', 'user10@example.com', CAST('hash10' AS varbinary(max)), CAST('salt10' AS varbinary(max)), 'image10.jpg', '2324 Avenue, City', '000-111-2222', 60),
('User Eleven', 'user11@example.com', CAST('hash11' AS varbinary(max)), CAST('salt11' AS varbinary(max)), 'image11.jpg', '2526 Road, City', '333-444-5555', 450),
('User Twelve', 'user12@example.com', CAST('hash12' AS varbinary(max)), CAST('salt12' AS varbinary(max)), 'image12.jpg', '2728 Lane, City', '666-777-8888', 530),
('User Thirteen', 'user13@example.com', CAST('hash13' AS varbinary(max)), CAST('salt13' AS varbinary(max)), 'image13.jpg', '2930 Court, City', '999-000-1111', 100),
('User Fourteen', 'user14@example.com', CAST('hash14' AS varbinary(max)), CAST('salt14' AS varbinary(max)), 'image14.jpg', '3132 Plaza, City', '222-333-4444', 390),
('User Fifteen', 'user15@example.com', CAST('hash15' AS varbinary(max)), CAST('salt15' AS varbinary(max)), 'image15.jpg', '3334 Parkway, City', '555-666-7777', 80);
go


-- Inserting data into `books`
DECLARE @bookId INT;
SET @bookId = 1;
WHILE @bookId <= 25
BEGIN
    INSERT INTO dbo.books (title, author, publisher, year_published, description, price, discount_percentage, image_url, rating)
    VALUES ('Book Title ' + CAST(@bookId AS VARCHAR), 'Author ' + CAST(@bookId AS VARCHAR), 'Publisher Name', 2020, 'This is a sample description for book ' + CAST(@bookId AS VARCHAR), 29.99, 10, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', 4.5);
    SET @bookId = @bookId + 1;
END;
go

-- Inserting data into `categories`
INSERT INTO dbo.categories (name, description)
VALUES 
('Fiction', 'Fictional works including novels, short stories, and narrative prose.'),
('Non-Fiction', 'Informative books including biographies, history, and self-help.'),
('Science Fiction', 'Books exploring futuristic concepts, technology, and space travel.'),
('Fantasy', 'Stories involving magic, mythical creatures, and epic adventures.'),
('Romance', 'Books focusing on love stories and relationships.'),
('Mystery', 'Thrillers and detective novels involving crime and investigations.'),
('Biography', 'Life stories of historical and influential figures.'),
('Children''s Books', 'Books for children including picture books and early readers.'),
('Young Adult', 'Books targeting teenage readers, often involving coming-of-age themes.'),
('Horror', 'Books designed to scare, featuring supernatural or psychological horror.'),
('Historical Fiction', 'Novels set in the past, blending historical events with fictional characters.'),
('Self-Help', 'Guides focused on personal development, mental health, and motivation.'),
('Graphic Novels', 'Narrative books told in comic-strip format, often featuring illustrations.'),
('Poetry', 'Collections of poems, ranging from classical to contemporary styles.'),
('Cookbooks', 'Guides for cooking, featuring recipes, techniques, and culinary tips.');
go


-- Creating book-category relationships
INSERT INTO dbo.book_categories (book_id, category_id)
VALUES 
-- Book 1
(1, 1),(1, 3),(1, 5),
-- Book 2
(2, 2),(2, 4),(2, 6),
-- Book 3
(3, 1),(3, 2),(3, 7),
-- Book 4
(4, 3),(4, 8),(4, 9),
-- Book 5
(5, 4),(5, 5),(5, 10),
-- Book 6
(6, 6),(6, 7),(6, 11),
-- Book 7
(7, 2),(7, 8),(7, 12),
-- Book 8
(8, 1),(8, 3),(8, 13),
-- Book 9
(9, 5),(9, 6),(9, 14),
-- Book 10
(10, 4),(10, 7),(10, 15),
-- Book 11
(11, 1),(11, 8),(11, 10),
-- Book 12
(12, 2),(12, 9),(12, 11),
-- Book 13
(13, 3),(13, 6),(13, 12),
-- Book 14
(14, 4),(14, 7),(14, 13),
-- Book 15
(15, 5),(15, 8),(15, 14),
-- Book 16
(16, 1),(16, 2),(16, 15),
-- Book 17
(17, 3),(17, 4),(17, 11),
-- Book 18
(18, 6),(18, 7),(18, 12),
-- Book 19
(19, 8),(19, 9),(19, 13),
-- Book 20
(20, 2),(20, 10),(20, 15),
-- Book 21
(21, 1),(21, 4),(21, 14),
-- Book 22
(22, 3),(22, 6),(22, 13),
-- Book 23
(23, 5),(23, 7),(23, 11),
-- Book 24
(24, 8),(24, 10),(24, 12),
-- Book 25
(25, 1),(25, 2),(25, 15);
go


-- Inserting data into `carts`
INSERT INTO dbo.carts (user_id)
VALUES 
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15);
go



-- Inserting data into `cart_items`
INSERT INTO dbo.cart_items (cart_id, book_id, quantity, format, price)
VALUES 
(1, 1, 1, 'PDF', 19.99),(1, 3, 2, 'Hard Copy', 24.99),(1, 7, 1, 'PDF', 14.99),
(2, 4, 1, 'Hard Copy', 29.99),(2, 8, 1, 'PDF', 18.49),
(3, 9, 2, 'PDF', 13.49),(3, 10, 1, 'Hard Copy', 22.99),(3, 12, 3, 'PDF', 17.49),(3, 15, 1, 'Hard Copy', 30.99),
(4, 2, 1, 'PDF', 20.00),(4, 5, 2, 'Hard Copy', 25.00),(4, 6, 1, 'PDF', 15.00),
(5, 11, 1, 'PDF', 22.99),(5, 13, 1, 'Hard Copy', 18.00),(5, 14, 1, 'PDF', 12.49),
(6, 16, 1, 'PDF', 21.00),(6, 18, 2, 'Hard Copy', 27.00),(6, 20, 1, 'PDF', 16.00),
(7, 17, 1, 'Hard Copy', 19.99),(7, 19, 1, 'PDF', 15.49),(7, 21, 1, 'Hard Copy', 22.99),
(8, 22, 2, 'PDF', 18.00),(8, 23, 1, 'Hard Copy', 20.99),
(9, 24, 3, 'PDF', 25.00),(9, 25, 1, 'Hard Copy', 30.00),
(10, 1, 2, 'PDF', 19.99),(10, 4, 1, 'Hard Copy', 29.99),(10, 5, 1, 'PDF', 14.99),
(11, 6, 1, 'Hard Copy', 25.00),(11, 8, 1, 'PDF', 17.49),(11, 9, 1, 'Hard Copy', 22.99),
(12, 7, 1, 'PDF', 14.99),(12, 10, 2, 'Hard Copy', 20.00),
(13, 12, 1, 'PDF', 18.00),(13, 13, 1, 'Hard Copy', 27.00),(13, 14, 1, 'PDF', 20.00),
(14, 15, 2, 'PDF', 22.00),(14, 17, 1, 'Hard Copy', 29.00),
(15, 18, 1, 'PDF', 13.49),(15, 19, 1, 'Hard Copy', 17.99),(15, 20, 1, 'PDF', 21.49);
go


-- Inserting data into `orders`
INSERT INTO dbo.orders (user_id, total_amount, status, transaction_id)
VALUES 
(1, 59.97, 'Delivered', 'TXN1001'),
(2, 84.50, 'Shipped', 'TXN1002'),
(3, 120.00, 'Delivered', 'TXN1003'),
(4, 35.75, 'Cancelled', 'TXN1004'),
(5, 77.90, 'Delivered', 'TXN1005'),
(6, 42.00, 'Shipped', 'TXN1006'),
(7, 95.40, 'Delivered', 'TXN1007'),
(8, 63.20, 'Shipped', 'TXN1008'),
(9, 82.30, 'Delivered', 'TXN1009'),
(10, 51.60, 'Shipped', 'TXN1010'),
(11, 74.00, 'Cancelled', 'TXN1011'),
(12, 58.25, 'Delivered', 'TXN1012'),
(13, 88.90, 'Shipped', 'TXN1013'),
(14, 67.80, 'Shipped', 'TXN1014'),
(15, 101.50, 'Delivered', 'TXN1015');
go


-- Inserting data into `order_items`
INSERT INTO dbo.order_items (order_id, book_id, quantity, price, format)
VALUES 
(1, 1, 1, 19.99, 'PDF'),(1, 5, 2, 24.99, 'Hard Copy'),
(2, 2, 1, 15.00, 'PDF'),(2, 8, 2, 9.99, 'Hard Copy'),(2, 14, 1, 17.50, 'PDF'),
(3, 4, 1, 22.50, 'PDF'),(3, 7, 2, 30.00, 'Hard Copy'),(3, 11, 1, 12.99, 'PDF'),
(4, 3, 1, 17.99, 'PDF'),(4, 9, 1, 29.99, 'Hard Copy'),(4, 12, 1, 25.50, 'PDF'),(4, 16, 1, 20.00, 'Hard Copy'),
(5, 6, 1, 25.00, 'PDF'),(5, 10, 1, 14.99, 'Hard Copy'),(5, 15, 2, 18.50, 'PDF'),
(6, 2, 1, 12.00, 'PDF'),(6, 11, 2, 19.00, 'Hard Copy'),(6, 18, 1, 22.00, 'PDF'),
(7, 1, 2, 21.99, 'PDF'),(7, 12, 1, 26.50, 'Hard Copy'),(7, 14, 1, 15.75, 'PDF'),
(8, 5, 1, 20.00, 'PDF'),(8, 13, 3, 22.50, 'Hard Copy'),(8, 17, 1, 19.99, 'PDF'),
(9, 4, 2, 18.75, 'PDF'),(9, 14, 1, 28.00, 'Hard Copy'),(9, 20, 2, 33.00, 'PDF'),
(10, 6, 4, 25.99, 'PDF'),(10, 15, 1, 35.00, 'Hard Copy'),
(11, 7, 2, 29.99, 'PDF'),(11, 16, 1, 31.00, 'Hard Copy'),
(12, 8, 3, 27.50, 'PDF'),(12, 17, 1, 22.00, 'Hard Copy'),(12, 19, 1, 15.00, 'PDF'),
(13, 9, 1, 23.75, 'PDF'),(13, 18, 2, 32.50, 'Hard Copy'),
(14, 10, 1, 18.00, 'PDF'),(14, 19, 3, 27.00, 'Hard Copy'),
(15, 11, 2, 21.50, 'PDF'),(15, 20, 1, 33.00, 'Hard Copy');
go


-- Inserting data into `comments_reviews`
INSERT INTO dbo.comments_reviews (user_id, book_id, comment_text, rating)
VALUES 
(1, 1, 'Great book! Very insightful.', 5),
(2, 1, 'Quite good, but could be better.', 4),
(3, 1, 'Not what I expected. Poor content.', 2),

(4, 2, 'A fascinating read. Highly recommended!', 5),
(5, 2, 'Interesting but a bit lengthy.', 3),
(6, 2, 'Not worth the price.', 2),

(7, 3, 'Excellent book. Loved it!', 5),
(8, 3, 'Well written and engaging.', 4),
(9, 3, 'Average. Nothing special.', 3),

(10, 4, 'A fantastic story. Will read again.', 5),
(11, 4, 'Good but has some flaws.', 3),
(12, 4, 'Poorly written and boring.', 1),

(13, 5, 'Great value for money.', 4),
(14, 5, 'Okay read, nothing extraordinary.', 3),

(15, 6, 'Excellent read. Well worth the time.', 5),
(1, 6, 'A decent book, but not memorable.', 3),

(2, 7, 'Loved the characters and plot.', 5),
(3, 7, 'Interesting but somewhat slow.', 3),

(4, 8, 'Informative and well-written.', 4),
(5, 8, 'Too technical and dry.', 2),

(6, 9, 'Engaging from start to finish.', 5),

(7, 10, 'A good book with some strong points.', 4),
(8, 10, 'The story was too predictable.', 2),

(9, 11, 'Amazing book! Highly recommended.', 5),
(10, 11, 'The book was okay, but I expected more.', 3),

(11, 12, 'A decent book, worth reading.', 3),
(12, 12, 'Not very engaging.', 2),

(13, 13, 'Fantastic! Couldn''t put it down.', 5),
(14, 13, 'Pretty good, but could be improved.', 4),

(15, 14, 'Boring and repetitive.', 1),

(1, 15, 'A great book. Would read more from this author.', 4),
(2, 15, 'A bit disappointing.', 2),

(3, 16, 'Wonderful book. Very inspiring.', 5),

(4, 17, 'Quite enjoyable. Worth the read.', 4),
(5, 17, 'The pacing was a bit slow.', 3),

(6, 18, 'Not my favorite. Just okay.', 3),
(7, 18, 'Pretty poor. Didn''t like it.', 2),

(8, 19, 'Excellent book. Truly enjoyed it.', 5),

(9, 20, 'Good but not great.', 3),
(10, 20, 'Not as expected. Overrated.', 2);
go


-- Inserting data into `wishlist`
INSERT INTO dbo.wishlist (user_id, book_id) VALUES
(1, 1), (1, 2), (1, 5), (1, 8),
(2, 3), (2, 4), (2, 6), (2, 9), (2, 10),
(3, 7), (3, 11), (3, 13),
(4, 8), (4, 12), (4, 14), (4, 15),
(5, 1), (5, 2), (5, 6), (5, 7), (5, 16),
(6, 3), (6, 4), (6, 5), (6, 17),
(7, 18), (7, 19), (7, 20),
(8, 21), (8, 22), (8, 23), (8, 24),
(9, 7), (9, 11), (9, 25),
(10, 5), (10, 9), (10, 12), (10, 13), (10, 14),
(11, 15), (11, 16), (11, 18),
(12, 2), (12, 4), (12, 6), (12, 7), (12, 19),
(13, 8), (13, 10), (13, 20),
(14, 22), (14, 23), (14, 24),
(15, 1), (15, 3), (15, 5), (15, 8), (15, 25);
go


-- Inserting data into `coupons`
INSERT INTO dbo.coupons (name, discount_amount, expiration_date, status) VALUES
('SUMMER2023', 15.00, '2023-08-31', 'Expired'),
('WINTER2022', 20.00, '2022-12-31', 'Expired'),
('FALL2022', 10.00, '2022-10-15', 'Expired'),
('SPRING2023', 25.00, '2023-05-31', 'Expired'),
('WELCOME2022', 10.00, '2022-09-30', 'Expired'),
('BUY2GET1_2022', 5.00, '2022-11-30', 'Expired'),
('HOLIDAY2022', 25.00, '2022-12-25', 'Expired'),
('BLACKFRIDAY2022', 30.00, '2022-11-29', 'Expired'),
('NEWYEAR2023', 20.00, '2023-01-31', 'Expired'),
('CLEARANCE2022', 50.00, '2022-07-15', 'Expired'),
('NEWYEAR2024', 20.00, '2024-01-31', 'Active'),
('SPRING2024', 25.00, '2024-05-31', 'Active'),
('SUMMER2024', 15.00, '2024-08-31', 'Active'),
('FALL2024', 10.00, '2024-10-15', 'Active'),
('WELCOME10', 10.00, '2024-09-30', 'Active'),
('BUY2GET1', 5.00, '2024-11-30', 'Active'),
('HOLIDAY25', 25.00, '2024-12-25', 'Active'),
('BLACKFRIDAY', 30.00, '2024-11-29', 'Expired'),
('NEWYEAR2025', 20.00, '2025-01-31', 'Active'),
('CLEARANCE50', 50.00, '2024-07-15', 'Expired');
go


-- Inserting data into `points_loyalty`
INSERT INTO dbo.points_loyalty (user_id, points_earned, points_redeemed) VALUES
(1, 120, 30),    -- User One
(2, 220, 50),    -- User Two
(3, 40, 20),     -- User Three
(4, 30, 10),     -- User Four
(5, 25, 10),     -- User Five
(6, 300, 80),    -- User Six
(7, 600, 100),   -- User Seven
(8, 40, 15),     -- User Eight
(9, 100, 25),    -- User Nine
(10, 80, 30),    -- User Ten
(11, 500, 60),   -- User Eleven
(12, 600, 100),  -- User Twelve
(13, 120, 50),   -- User Thirteen
(14, 400, 70),   -- User Fourteen
(15, 90, 20);    -- User Fifteen
go


-- Inserting data into `contact_us`
INSERT INTO dbo.contact_us (name, email, subject, message) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'Inquiry about product availability', 'Hello, I would like to know if the book "Advanced Programming" is in stock. Thank you.'),
('Bob Smith', 'bob.smith@example.com', 'Feedback on recent purchase', 'I recently bought "Introduction to Algorithms" and found the delivery to be quite delayed. Can you provide an update?'),
('Charlie Davis', 'charlie.davis@example.com', 'Question about return policy', 'Can you please explain your return policy for damaged items? I received a damaged book.'),
('Diana Lee', 'diana.lee@example.com', 'Request for discount code', 'I am a frequent customer and was wondering if there are any discount codes available for loyal customers.'),
('Evan Brown', 'evan.brown@example.com', 'Issue with payment', 'I encountered an error while trying to process my payment. Can you assist me with this issue?'),
('Fiona Green', 'fiona.green@example.com', 'Product recommendation', 'I’m looking for recommendations on books related to data science. Any suggestions?'),
('George White', 'george.white@example.com', 'Complaint about customer service', 'I had a bad experience with customer service and would like to file a complaint. Please contact me for more details.'),
('Hannah Clark', 'hannah.clark@example.com', 'Update on order status', 'I placed an order last week and would like an update on its shipping status.'),
('Ian Walker', 'ian.walker@example.com', 'Question about membership benefits', 'Could you provide more information on the benefits of the membership program?'),
('Jasmine Rodriguez', 'jasmine.rodriguez@example.com', 'Error on website', 'I noticed a bug on the checkout page where the discount is not applied correctly. Can this be fixed?');
go


-- Inserting data into `library`
INSERT INTO dbo.library (user_id, book_id, format) VALUES
(1, 1, 'PDF'),(1, 2, 'Hard Copy'),(1, 3, 'PDF'),(1, 4, 'Hard Copy'),(1, 5, 'PDF'),
(2, 6, 'PDF'),(2, 7, 'Hard Copy'),(2, 8, 'PDF'),(2, 9, 'Hard Copy'),(2, 10, 'PDF'),(2, 11, 'Hard Copy'),
(3, 12, 'PDF'),(3, 13, 'Hard Copy'),(3, 14, 'PDF'),(3, 15, 'Hard Copy'),
(4, 16, 'PDF'),(4, 17, 'Hard Copy'),(4, 18, 'PDF'),(4, 19, 'Hard Copy'),(4, 20, 'PDF'),
(5, 21, 'Hard Copy'),(5, 22, 'PDF'),(5, 23, 'Hard Copy'),(5, 24, 'PDF'),(5, 25, 'Hard Copy'),
(6, 1, 'Hard Copy'),(6, 2, 'PDF'),(6, 3, 'Hard Copy'),(6, 4, 'PDF'),(6, 5, 'Hard Copy'),(6, 6, 'PDF'),
(7, 7, 'Hard Copy'),(7, 8, 'PDF'),(7, 9, 'Hard Copy'),(7, 10, 'PDF'),(7, 11, 'Hard Copy'),(7, 12, 'PDF'),(7, 13, 'Hard Copy'),
(8, 14, 'PDF'),(8, 15, 'Hard Copy'),(8, 16, 'PDF'),(8, 17, 'Hard Copy'),(8, 18, 'PDF'),
(9, 19, 'Hard Copy'),(9, 20, 'PDF'),(9, 21, 'Hard Copy'),(9, 22, 'PDF'),(9, 23, 'Hard Copy'),(9, 24, 'PDF'),(9, 25, 'Hard Copy'),
(10, 1, 'PDF'),(10, 2, 'Hard Copy'),(10, 3, 'PDF'),(10, 4, 'Hard Copy'),(10, 5, 'PDF'),(10, 6, 'Hard Copy'),(10, 7, 'PDF'),(10, 8, 'Hard Copy'),
(11, 9, 'Hard Copy'),(11, 10, 'PDF'),(11, 11, 'Hard Copy'),(11, 12, 'PDF'),(11, 13, 'Hard Copy'),(11, 14, 'PDF'),(11, 15, 'Hard Copy'),(11, 16, 'PDF'),
(12, 17, 'PDF'),(12, 18, 'Hard Copy'),(12, 19, 'PDF'),(12, 20, 'Hard Copy'),(12, 21, 'PDF'),(12, 22, 'Hard Copy'),(12, 23, 'PDF'),
(13, 24, 'Hard Copy'),(13, 25, 'PDF'),(13, 1, 'Hard Copy'),(13, 2, 'PDF'),(13, 3, 'Hard Copy'),
(14, 4, 'PDF'),(14, 5, 'Hard Copy'),(14, 6, 'PDF'),(14, 7, 'Hard Copy'),(14, 8, 'PDF'),(14, 9, 'Hard Copy'),(14, 10, 'PDF'),(14, 11, 'Hard Copy'),
(15, 12, 'PDF'),(15, 13, 'Hard Copy'),(15, 14, 'PDF'),(15, 15, 'Hard Copy'),(15, 16, 'PDF'),(15, 17, 'Hard Copy');
go

