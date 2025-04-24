# Personal Task Tracker

Personal Task Tracker, kullanıcıların kişisel yapılacaklar listelerini (ToDo list) özel olarak oluşturup yönetebilecekleri bir web uygulamasıdır. Frontend kısmı React ile, backend kısmı ise ASP.NET Core ile geliştirilmiştir.

## Özellikler

- Kullanıcı kimlik doğrulaması ve yetkilendirme(Protokolsüz; JWT, Paseto gibi protokoller içermiyor)
- Görev oluşturma, ilgili projeye görev atama
- Görevlerin tamamlanma, durumunu güncelleme
- Kullanıcıya özel görev listesi
- Modern ve kullanıcı dostu arayüz

## Teknolojiler

- ASP.NET Core (C#) – Backend API
- React – Frontend arayüzü
- Entity Framework Core – Veri erişimi
- HTML, CSS, JavaScript

## Kurulum

### Gereksinimler

- .NET 7 SDK veya üzeri
- Node.js ve npm
- PostgreSQL için Pg Admin

### Backend (ASP.NET Core)

1. `backend` klasörüne gidin:

   ```bash
   cd backend
   ```


2. Gerekli NuGet paketlerini yükleyin:

   ```bash
   dotnet restore
   ```


3. Veritabanını oluşturun ve güncelleyin:

   ```bash
   dotnet ef database update
   ```


4. Uygulamayı başlatın:

   ```bash
   dotnet run
   ```


### Frontend (React)

1. `frontend` klasörüne gidin:

   ```bash
   cd frontend
   ```


2. Gerekli npm paketlerini yükleyin:

   ```bash
   npm install
   ```


3. Uygulamayı başlatın:

   ```bash
   npm start
   ```


## Kullanım

1. Uygulamayı başlattıktan sonra, tarayıcınızda `http://localhost:3000` adresine gidin.
2. Yeni bir kullanıcı kaydı oluşturun(task Dosyasında hazır verilerdeki bilgiler) veya mevcut bir kullanıcı ile giriş yapın.
3. Yeni görevler ekleyin, mevcut görevleri düzenleyin veya silin.
4. Görevlerin tamamlanma durumlarını güncelleyin.


## İletişim

Proje ile ilgili sorularınız veya önerileriniz için [mehmetkmrc](https://github.com/mehmetkmrc) ile iletişime geçebilirsiniz.

