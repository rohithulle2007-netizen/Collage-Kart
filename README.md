# Campus Reuse Hub - Student Marketplace

A clean, beginner-friendly campus marketplace website where college students can buy and sell second-hand academic and hostel essentials: **textbooks, calculators, stationery, electronics, and hostel items**.

---

## 🚀 How to Open and Run the Website

You don't need any special tools, compilers, databases, or local servers! It runs directly in any modern web browser:

### Option 1: Double-Click (Easiest)
1. Open File Explorer on your computer.
2. Open the project folder.
3. Double-click **`index.html`**.  
   It will instantly open in your default browser (Google Chrome, Microsoft Edge, Firefox, Brave, etc.).

### Option 2: Drag and Drop
1. Open your web browser.
2. Drag the `index.html` file from your project folder and drop it into the browser window.

### Option 3: Browser File Path
In your browser's address bar, type or paste the path to `index.html` and hit **Enter**.

---

## 📁 Project Structure

```text
Campus Reuse Hub/
├── index.html   # Main web page structure (Home, Browse Items, Sell an Item, Details Modal)
├── style.css    # Clean styling with plain white background, light green buttons, and subtle modern polish
├── script.js    # Logic for search, category filtering, real product photos, listings, and localStorage
└── README.md    # Instructions and project overview
```

---

## 🌟 Key Features

1. **Home Page & Campus Catalog:**
   - Displays the project brand **🌿 Campus Reuse Hub**, student marketplace tag, and active item count.
   - Pre-populated with **real product photos** and realistic campus products with Indian Rupee (**₹**) prices:
     - *Engineering Mathematics - B.S. Grewal (44th Ed)* (₹450)
     - *Casio FX-991EX ClassWiz Scientific Calculator* (₹750)
     - *Engineering Mini Drafter & Drawing Board Set* (₹350)
     - *Pigeon 1.5L Electric Kettle (Stainless Steel)* (₹420)
     - *Rechargeable LED Desk Study Lamp* (₹280)
     - *4-Socket Extension Board (3 Metre)* (₹200)
     - *Concepts of Physics (Vol 1 & 2) - H.C. Verma* (₹390)
     - *Foldable Cloth Drying Rack for Hostel* (₹360)

2. **Search Bar:**
   - Real-time search with a clean search icon input for searching by item name or category (e.g. typing "Casio", "Maths", or "Kettle").
   - **Reset** button restores full listings in one click.

3. **Category Filter Pills:**
   - Quick one-click category pills with icons:
     - **All**
     - **📚 Books**
     - **🔢 Calculators**
     - **📐 Stationery**
     - **💡 Electronics**
     - **🛏️ Hostel Items**

4. **Product Details Popup (Modal):**
   - Click **"View Details"** on any item to view its photo, condition pill, full description, and seller contact details.
   - **"Contact Seller"** button copies the contact number/WhatsApp info to clipboard and confirms it with a prompt.

5. **Sell an Item Form:**
   - Form with Item Name, Category, Price in ₹, Condition, Seller Contact, Optional Image URL, and Description.
   - Saves to browser `localStorage` and immediately displays the new product in the catalog.

6. **Local Storage Persistence:**
   - Listings are saved to browser `localStorage`.
   - Any items you post **remain saved even after refreshing or reopening your browser**.
