-- Bảng Roles
CREATE TABLE Roles (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE,    -- user, admin, supervisor, manager...
    Description NVARCHAR(255) NULL
);

-- Bảng Departments
CREATE TABLE Departments (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    DepartmentName NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255) NULL
);

-- Bảng Users
CREATE TABLE Users (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeCode NVARCHAR(50) NOT NULL UNIQUE,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE,
    Phone NVARCHAR(20) NULL,
    PasswordHash NVARCHAR(255) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    LastLogin DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    Shift NVARCHAR(50) NULL,
    Positions  NVARCHAR(150) NULL,
    Line NVARCHAR(50) NULL,
    CONSTRAINT UQ_Users_EmployeeCode UNIQUE (EmployeeCode), -- đảm bảo EmployeeCode duy nhất
    CONSTRAINT UQ_Users_Email UNIQUE (Email),                -- đảm bảo Email duy nhất
    CONSTRAINT UQ_Users_Username UNIQUE (Username)          -- đảm bảo Username duy nhất
);

-- Bảng trung gian UserRoleDepartments
CREATE TABLE UserRoleDepartments (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    RoleID INT NOT NULL,
    DepartmentID INT NOT NULL,
    CONSTRAINT UQ_UserRoleDept UNIQUE(UserID, RoleID, DepartmentID),
    CONSTRAINT FK_URD_User FOREIGN KEY (UserID) REFERENCES Users(ID) ON DELETE CASCADE,
    CONSTRAINT FK_URD_Role FOREIGN KEY (RoleID) REFERENCES Roles(ID) ON DELETE CASCADE,
    CONSTRAINT FK_URD_Department FOREIGN KEY (DepartmentID) REFERENCES Departments(ID) ON DELETE CASCADE
);
