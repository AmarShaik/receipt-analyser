# 🧾 SmartReceipt - AI-Powered Personal Finance Tracker

> **Scan receipts in real-time, extract data with AI, and gain intelligent insights into your spending habits.**

Built with **Google Gemini 3 API** for the Gemini 3 Hackathon.

## 🌟 Live Demo

**🔗 [Try Live Demo](https://receipt-analyser-alpha.vercel.app/)**

## 🎥 Demo Video

*[Watch 3-minute demo on YouTube](https://youtu.be/g8tOPjKFJ7o)*

## ✨ Features

### 🤖 AI-Powered Receipt Scanning
- Upload receipt images and extract data automatically using **Gemini 3 Vision API**
- Supports multiple formats: photos, scans, screenshots
- Extracts: merchant name, date, items, prices, categories, payment method

### 📊 Smart Analytics Dashboard
- Visual spending breakdown with interactive charts
- Category-wise expense tracking
- Monthly/weekly spending trends
- Top merchants and spending patterns

### 💡 Intelligent Insights
- **Gemini 3 Reasoning** generates personalized financial advice
- Spending pattern analysis
- Budget recommendations
- Saving opportunities with estimated amounts
- Financial health score (0-100)

### 💰 Budget Management
- Set monthly budgets per category
- Real-time budget tracking with progress bars
- Color-coded alerts (safe, warning, danger, critical)
- AI-suggested optimal budgets

### 🔍 Transaction History
- Search and filter receipts
- Sort by date, amount, or merchant
- Edit and delete transactions
- Export data to CSV

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **AI**: Google Gemini 3 API (Vision + Text Generation)
- **Charts**: Recharts
- **UI Components**: Shadcn/ui
- **Storage**: LocalStorage (demo) / MongoDB ready
- **Deployment**: Vercel

## 🚀 How Gemini 3 Powers SmartReceipt

### 1. **Vision API** - Receipt Scanning
```javascript
// Gemini 3 extracts structured data from receipt images
{
  "merchant": "Whole Foods Market",
  "date": "2024-02-01",
  "total": 127.43,
  "items": [
    { "name": "Organic Milk", "price": 6.99, "category": "food" }
  ]
}
```

### 2. **Text Generation** - Financial Insights
```javascript
// Gemini 3 analyzes spending and provides personalized advice
{
  "insights": [
    "You spent 40% more on dining out this month",
    "Switch to meal prepping to save ~$150/month"
  ],
  "financialHealthScore": 78,
  "predictedNextMonth": 520.00
}
```

## 📦 Installation

### Prerequisites
- Node.js 18+
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/AmarShaik/Smart-Receipt.git
cd Smart-Receipt
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env.local` file**
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

## 🧪 Testing

### Try the Demo
1. Visit `/demo` page
2. Click "Load Demo Data"
3. Explore dashboard, insights, and budgets

### Upload Real Receipts
1. Go to `/scan` page
2. Upload a receipt image
3. Watch Gemini 3 extract the data
4. View in dashboard

## 📸 Screenshots

### Homepage
![Homepage](screenshots/home.png)

### Receipt Scanner
![Scanner](screenshots/scanner.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### AI Insights
![Insights](screenshots/insights.png)

## 🎯 Hackathon Highlights

- ✅ **Multimodal AI**: Uses Gemini 3 Vision for image processing
- ✅ **Advanced Reasoning**: Generates personalized financial insights
- ✅ **Real-world Impact**: Solves actual financial tracking problems
- ✅ **Technical Depth**: Computer vision + NLP + Data analytics
- ✅ **User Experience**: Beautiful, intuitive interface
- ✅ **Scalability**: Ready for production with database integration

## 🔮 Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] User authentication (NextAuth.js)
- [ ] Mobile app (React Native)
- [ ] Receipt image storage (Cloudinary)
- [ ] Recurring expense detection
- [ ] Multi-currency support
- [ ] Export to accounting software
- [ ] Bill payment reminders
- [ ] Shared household budgets

## 👨‍💻 Author

**Amar Shaik**
- GitHub: [@AmarShaik](https://github.com/AmarShaik)
- Email: shaikamar907@gmail.com

## 🙏 Acknowledgments

- Built for the [Gemini 3 Hackathon](https://gemini3.devpost.com/)
- Powered by [Google Gemini 3 API](https://ai.google.dev/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)

---

**⭐ If you found this project helpful, please give it a star!**
