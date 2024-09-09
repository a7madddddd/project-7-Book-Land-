USE [BookLand]
GO
/****** Object:  Table [dbo].[admins]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admins](
	[id] [int] IDENTITY NOT NULL,
	[name] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[password_hash] [varbinary](max) NULL,
	[password_salt] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_categories]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_categories](
	[book_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[book_id] ASC,
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[books]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[books](
	[id] [int] IDENTITY NOT NULL,
	[title] [varchar](255) NULL,
	[author] [varchar](255) NULL,
	[publisher] [varchar](255) NULL,
	[year_published] [int] NULL,
	[description] [text] NULL,
	[price] [decimal](10, 2) NULL,
	[discount_percentage] [int] NULL,
	[image_url] [varchar](255) NULL,
	[rating] [decimal](3, 1) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cart_items]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart_items](
	[id] [int] IDENTITY NOT NULL,
	[cart_id] [int] NULL,
	[book_id] [int] NULL,
	[quantity] [int] NULL,
	[format] [varchar](50) NULL,
	[price] [decimal](10, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[carts]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[carts](
	[id] [int] IDENTITY NOT NULL,
	[user_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[categories]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[id] [int] IDENTITY NOT NULL,
	[name] [varchar](255) NULL,
	[description] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comments_reviews]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comments_reviews](
	[id] [int] IDENTITY NOT NULL,
	[user_id] [int] NULL,
	[book_id] [int] NULL,
	[comment_text] [varchar](255) NULL,
	[rating] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contact_us]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contact_us](
	[id] [int] IDENTITY NOT NULL,
	[name] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[subject] [varchar](255) NULL,
	[message] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[coupons]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coupons](
	[id] [int] IDENTITY NOT NULL,
	[name] [varchar](255) NULL,
	[discount_amount] [decimal](10, 2) NULL,
	[expiration_date] [date] NULL,
	[status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[library]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[library](
	[id] [int] IDENTITY NOT NULL,
	[user_id] [int] NULL,
	[book_id] [int] NULL,
	[format] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_items]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_items](
	[id] [int] IDENTITY NOT NULL,
	[order_id] [int] NULL,
	[book_id] [int] NULL,
	[quantity] [int] NULL,
	[price] [decimal](10, 2) NULL,
	[format] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[id] [int] IDENTITY NOT NULL,
	[user_id] [int] NULL,
	[total_amount] [decimal](10, 2) NULL,
	[status] [varchar](255) NULL,
	[transaction_id] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[points_loyalty]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[points_loyalty](
	[id] [int] IDENTITY NOT NULL,
	[user_id] [int] NULL,
	[points_earned] [int] NULL,
	[points_redeemed] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY NOT NULL,
	[name] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[password_hash] [varbinary](max) NULL,
	[password_salt] [varbinary](max) NULL,
	[image] [varchar](255) NULL,
	[address] [varchar](255) NULL,
	[phone_number] [varchar](255) NULL,
	[points] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wishlist]    Script Date: 9/6/2024 8:31:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wishlist](
	[id] [int] IDENTITY NOT NULL,
	[user_id] [int] NULL,
	[book_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[book_categories]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[books] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[book_categories]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[categories] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[cart_items]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[books] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[cart_items]  WITH CHECK ADD FOREIGN KEY([cart_id])
REFERENCES [dbo].[carts] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[carts]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[comments_reviews]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[books] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[comments_reviews]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[library]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[books] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[library]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[order_items]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[books] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[order_items]  WITH CHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[points_loyalty]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[wishlist]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[books] ([id]) on delete cascade on update cascade
GO
ALTER TABLE [dbo].[wishlist]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id]) on delete cascade on update cascade
GO
