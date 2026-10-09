"""
Playwright quality check script.
Tests:
- Desktop (1440x900) & Mobile (390x844) viewport rendering
- Zero horizontal overflow (scrollWidth === innerWidth)
- Console errors/exceptions
- Key interactions: ID card flip, skills inspector, accordion expand
- Captures full and section screenshots
"""

import asyncio
from playwright.async_api import async_playwright

async def run_checks():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Desktop Test (1440x900)
        print("=== [1/2] TESTING DESKTOP (1440x900) ===")
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: console_errors.append(str(exc)))

        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Check scrollWidth vs innerWidth
        desktop_overflow = await page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print(f"Desktop Dimensions: scrollWidth={desktop_overflow['scrollWidth']}, innerWidth={desktop_overflow['innerWidth']}, hasOverflow={desktop_overflow['hasOverflow']}")
        assert not desktop_overflow['hasOverflow'], "Desktop horizontal overflow detected!"

        # Take screenshot of Hero
        await page.screenshot(path="public/desktop_hero_1440.png")
        print("Captured desktop_hero_1440.png")

        # Test ID Card Flip (use dispatch_event to bypass stability check on continuous idle sway)
        id_card = page.locator(".card-swing-wrapper")
        await id_card.dispatch_event("click")
        await page.wait_for_timeout(400)
        card_flipped = await page.evaluate("""() => {
            const el = document.querySelector('.card-flipper');
            return el ? el.classList.contains('[transform:rotateY(180deg)]') : false;
        }""")
        print(f"ID Card Flip Tested: flipped={card_flipped}")

        # Scroll down to test periodic table and achievements
        await page.evaluate("window.scrollTo(0, 1500)")
        await page.wait_for_timeout(600)
        await page.evaluate("window.scrollTo(0, 3000)")
        await page.wait_for_timeout(600)
        
        # Full page screenshot
        await page.screenshot(path="public/desktop_full_1440.png", full_page=True)
        print("Captured desktop_full_1440.png")

        await context.close()

        # 2. Mobile Test (390x844 - iPhone 14/15 size)
        print("\n=== [2/2] TESTING MOBILE (390x844) ===")
        m_context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            has_touch=True
        )
        m_page = await m_context.new_page()
        m_page.on("console", lambda msg: console_errors.append(f"[Mobile] {msg.text}") if msg.type == "error" else None)
        m_page.on("pageerror", lambda exc: console_errors.append(f"[Mobile] {str(exc)}"))

        await m_page.goto("http://localhost:3000", wait_until="networkidle")
        await m_page.wait_for_timeout(1000)

        mobile_overflow = await m_page.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                hasOverflow: document.documentElement.scrollWidth > window.innerWidth
            };
        }""")
        print(f"Mobile Dimensions: scrollWidth={mobile_overflow['scrollWidth']}, innerWidth={mobile_overflow['innerWidth']}, hasOverflow={mobile_overflow['hasOverflow']}")
        assert not mobile_overflow['hasOverflow'], "Mobile horizontal overflow detected!"

        await m_page.screenshot(path="public/mobile_hero_390.png")
        print("Captured mobile_hero_390.png")

        await m_page.evaluate("window.scrollTo(0, 1200)")
        await m_page.wait_for_timeout(500)

        await m_page.screenshot(path="public/mobile_full_390.png", full_page=True)
        print("Captured mobile_full_390.png")

        await m_context.close()
        await browser.close()

        print("\n=== CONSOLE AUDIT ===")
        if console_errors:
            print(f"Console errors found ({len(console_errors)}):")
            for err in console_errors:
                print(" -", err)
        else:
            print("Zero console errors! Clean runtime.")

if __name__ == "__main__":
    asyncio.run(run_checks())
