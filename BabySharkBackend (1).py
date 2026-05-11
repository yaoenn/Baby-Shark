import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

generation_config = {
    "max_output_tokens": 500,
    "temperature": 0.7,
}

model = genai.GenerativeModel('models/gemini-flash-latest')

# --- DATA ---
user = {
    "username":   "Ahmad Razif",
    "age":          28,
    "occupation": "Software Engineer",
    "location":   "Kuala Lumpur, Malaysia",
    "daily_streak": 15
}

bank_account = {
    "main_balance": 1000.00,
    "pockets": {
        "food":           {"budget": 0.4 * 1000.00},
        "transport":      {"budget": 0.3 * 1000.00},
        "entertainment":  {"budget": 0.3 * 1000.00},
    },
}

monthly_spending = [
    {
        "month":  "March 2026",
        "spending": {"food": 350.00, "transport": 240.00, "entertainment": 200.00},
        "note": "Spent more on food delivery than usual.",
    },
    {
        "month":  "April 2026",
        "spending": {"food": 300.00, "transport": 260.00, "entertainment": 240.00},
        "note": "Entertainment slightly over from a concert ticket.",
    },
    {
        "month":  "May 2026",
        "spending": {"food": 310.00, "transport": 200.00, "entertainment": 170.00},
        "note": "Carpooling helped save transport costs.",
    },
]

# --- ALERT ---
def pocket_status(pocket_name, amount_spent):
    budget = bank_account["pockets"][pocket_name]["budget"]
    remaining = budget - amount_spent
    used_pct = (amount_spent / budget) * 100
    status = "over budget" if used_pct >= 100 else "near limit" if used_pct >= 80 else "within budget"
    return {"budget": budget, "spent": amount_spent, "remaining": remaining, "used_pct": round(used_pct, 1), "status": status}

# --- INTERACTIVE AI FINANCIAL COACH ---
def interactive_chat():
    print("\n[ Entering Chat Mode with Gemini... Type 'exit' to return to menu ]")
    
    chat = model.start_chat(history=[])
    context = (f"You are a friendly Malaysian financial peer. User: {user['username']}, "
               f"Streak: {user['daily_streak']}, Be concise and supportive.")
    
    while True:
        user_msg = input(f"\n{user['username']}: ").strip()
        if user_msg.lower() == 'exit': break
        
        try:
            response = chat.send_message(f"{context}\nUser says: {user_msg}")
            print(f"Gemini: {response.text}")
        except Exception:
            print(" (Chat connection interrupted.)")

# --- DISPLAY FUNCTIONS ---
def show_user_profile():
    print("\n================ User Profile ================")
    print(f" 🔥 Daily Streak: {user['daily_streak']} Days")
    for k, v in user.items(): 
        if k != "daily_streak": print(f" {k.capitalize():<12}: {v}")

def show_monthly_history():
    print("\n================ Monthly History ================")
    for record in monthly_spending:
        print(f"\n Month: {record['month']}")
        for p, amt in record["spending"].items():
            info = pocket_status(p, amt)
            print(f"  {p.capitalize():<15} RM{amt:>7.2f} / RM{info['budget']:.2f} ({info['used_pct']}%) [{info['status']}]")

def show_reward_vault():
    print("\n================ 🏆 REWARD VAULT 🏆 ================")
    streak = user["daily_streak"]
    print(f" Current Daily Streak: {streak} Days")
    print(" (Rewards do not consume your streak when claimed)")
    
    # List all rewards and check eligibility for each
    rewards = [
        (3, "RM1 Cashback"),
        (7, "Tealive RM5"),
        (14, "RM10 Voucher"),
        (30, "RM50 Bonus")
    ]
    
    print("\n REWARD LIST:")
    for days, name in rewards:
        status = "[ ELIGIBLE ]" if streak >= days else "[  LOCKED  ]"
        print(f" {status} {days}-Day Streak: {name}")
    print("====================================================")

# --- AI REPORT FOR THE LAST 3 MONTHS ---
def ai_consolidated_report():
    print("\n[ Analyzing data with Google Gemini... ]\n")
    history_summary = ""
    for r in monthly_spending:
        history_summary += f"- {r['month']}: Food RM{r['spending']['food']}, Transport RM{r['spending']['transport']}, Ent. RM{r['spending']['entertainment']}.\n"

    prompt = f"""
    Professional Financial Advisor Malaysia.
    USER: {user['username']} | STREAK: {user['daily_streak']} | DATA: {history_summary}
    
    Report:
    1. SPENDING TREND SUMMARY
    2. RISK ALERTS
    3. BEHAVIOR ANALYSIS
    4. SUGGESTION (laptop RM3,000 in 2 months)
    5. STREAK ENCOURAGEMENT: Mention their {user['daily_streak']} day streak.
    """

    try:
        response = model.generate_content(prompt)
        print("============================================================")
        print("        GOOGLE AI COMPREHENSIVE FINANCIAL REPORT")
        print("============================================================")
        print(response.text)
        print("============================================================")
    except Exception:
        print(" (AI connection busy.)")

# --- MAIN MENU ---
def main():
    while True:
        print(f"\nPersonal Finance Tracker (Streak: {user['daily_streak']}🔥)")
        print("1. Profile | 2. History | 3. Ask AI Chat | 4. AI REPORT | 5. REWARD VAULT | 6. Exit")
        choice = input("Select an option: ").strip()

        if choice == "1": show_user_profile()
        elif choice == "2": show_monthly_history()
        elif choice == "3": interactive_chat()
        elif choice == "4": ai_consolidated_report()
        elif choice == "5": show_reward_vault()
        elif choice == "6": break
        else: print("Invalid choice.")

if __name__ == "__main__":
    main()