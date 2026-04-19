from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

# Initialize client only if key exists
client = OpenAI(api_key=api_key) if api_key else None


def generate_weekly_insight(summary: dict) -> str:
    """
    Generates a weekly insight using OpenAI.
    Falls back to a safe local response if API fails or is unavailable.
    """

    # 🧠 Fallback logic (used if API fails)
    def fallback_insight():
        if summary["total_minutes"] == 0:
            return "Your energy is still gathering. Try logging a session to begin your journey 🌱"

        if summary["dominant_chakra"] == "heart":
            return "This week reflects a focus on heart-centered energy. You may be cultivating compassion and emotional balance 💚"

        if summary["trend_direction"] == "increasing":
            return "Your energy is growing steadily this week. Keep building your practice ✨"

        return "Your journey continues. Stay consistent and mindful 🌿"

    # 🚀 Try OpenAI
    try:
        if not client:
            return fallback_insight()

        prompt = f"""
You are a calm and supportive wellness assistant.

Based on the user's weekly activity:

- Total minutes: {summary['total_minutes']}
- Sessions: {summary['entries']}
- Dominant chakra: {summary['dominant_chakra']}
- Active days: {summary['active_days']}
- Top activity: {summary['top_activity']}
- Trend: {summary['trend_direction']}

Write a short, reflective and encouraging insight (2-3 sentences).
Do NOT give medical advice.
Keep the tone calm, positive, and mindful.
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a gentle wellness reflection assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )

        return response.choices[0].message.content

    except Exception:
        return fallback_insight()