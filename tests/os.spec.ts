import { test, expect, type Page } from "@playwright/test";
async function capture(
  page: Page,
  options: {
    path: string;
  },
) {
  if (await page.locator(".app-window").count())
    await expect(page.locator(".app-window").last()).toHaveCSS("opacity", "1");
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          return rect.top < innerHeight && rect.bottom > 0;
        })
        .map((image) => (image as HTMLImageElement).decode().catch(() => {})),
    );
  });
  await page.screenshot(options);
}
for (const [device, width, height] of [
  ["desktop", 1440, 900],
  ["tablet", 768, 1024],
  ["mobile", 390, 844],
  ["android", 412, 915],
  ["landscape", 844, 390],
] as const) {
  test(`${device}: complete OS journey`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Unlock desktop" }),
    ).toBeVisible();
    await expect(page.locator(".lock-clock h1")).toHaveText(/\d{2}:\d{2}/);
    await page
      .locator(".wallpaper")
      .evaluate((el: HTMLImageElement) => el.decode());
    if (device === "desktop" || device === "mobile")
      await capture(page, { path: `docs/screenshots/${device}-lock.png` });
    await page.getByRole("button", { name: "Unlock desktop" }).click();
    await expect(page.locator(".lock-screen")).toHaveCount(0);
    if (device === "desktop" || device === "mobile")
      await capture(page, { path: `docs/screenshots/${device}-home.png` });
    await page.getByRole("button", { name: "Safari", exact: true }).click();
    await expect(
      page.getByRole("heading", {
        name: "Turning a feeling into something real.",
      }),
    ).toBeVisible();
    if (device === "desktop" || device === "mobile")
      await capture(page, { path: `docs/screenshots/${device}-safari.png` });
    await page.getByRole("button", { name: "about", exact: true }).click();
    await expect(
      page.getByText("Curiosity is the thread.", { exact: false }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await page.getByRole("button", { name: "Close application" }).click();
    await expect(page.locator(".app-window")).toHaveCount(0);
    await page.getByRole("button", { name: "Photos", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Life, in frames." }),
    ).toBeVisible();
    if (device === "desktop")
      await capture(page, { path: "docs/screenshots/photos.png" });
    await page
      .getByRole("button", { name: "View Electric atmosphere" })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Photo viewer" }),
    ).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("heading", { name: "Lost in the sound" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close photo" }).click();
    await page.getByRole("button", { name: "Close application" }).click();
    await expect(page.locator(".app-window")).toHaveCount(0);
    await page.getByRole("button", { name: "Notes", exact: true }).click();
    await page.getByLabel("YOUR NAME").fill("Playwright visitor");
    await page
      .getByLabel("LEAVE A LITTLE SOMETHING")
      .fill("A thoughtful little corner of the internet.");
    if (device === "desktop")
      await capture(page, { path: "docs/screenshots/notes.png" });
    await page
      .getByRole("button", { name: "Leave your note", exact: true })
      .click();
    await expect(
      page.getByText("Saved on this browser only.", { exact: false }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close application" }).click();
    await expect(page.locator(".app-window")).toHaveCount(0);
    await page.getByRole("button", { name: "Guestbook", exact: true }).click();
    await expect(page.getByText("Your private demo notes")).toBeVisible();
    await expect(
      page.getByText("A thoughtful little corner of the internet.", {
        exact: true,
      }),
    ).toBeVisible();
    if (device === "desktop")
      await capture(page, { path: "docs/screenshots/guestbook.png" });
    await page.getByRole("button", { name: "Close application" }).click();
    await expect(page.locator(".app-window")).toHaveCount(0);
    await page
      .getByRole("button", { name: "After Hours", exact: true })
      .click();
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Keep the concept" }).click();
    expect((await download).suggestedFilename()).toBe(
      "after-hours-concept.txt",
    );
    await page.getByRole("button", { name: "Close application" }).click();
    await expect(page.locator(".app-window")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    expect(errors).toEqual([]);
  });
}
test("validation, keyboard and gesture", async ({ page, request }) => {
  const response = await request.post("/api/notes", { data: { message: "a" } });
  expect(response.status()).toBe(400);
  await page.goto("/");
  await expect(page.locator(".lock-clock h1")).toHaveText(/\d{2}:\d{2}/);
  await page.keyboard.press("Enter");
  await expect(page.locator(".lock-screen")).toHaveCount(0);
  await page.getByRole("button", { name: "Safari", exact: true }).click();
  await page.getByRole("button", { name: "Minimize application" }).click();
  await expect(
    page.getByRole("dialog", { name: "Safari", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Safari", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Safari", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Lock screen", exact: true }).click();
  await page.mouse.move(600, 600);
  await page.mouse.down();
  await page.mouse.move(600, 200, { steps: 10 });
  await page.mouse.up();
  await expect(page.locator(".lock-screen")).toHaveCount(0);
});

test("touch gestures and reduced motion", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".lock-clock h1")).toHaveText(/\d{2}:\d{2}/);
  const session = await context.newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 195, y: 710 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 195, y: 400 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.locator(".lock-screen")).toHaveCount(0);
  await page.getByRole("button", { name: "Photos", exact: true }).tap();
  await page.getByRole("button", { name: "View Electric atmosphere" }).tap();
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 330, y: 400 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 80, y: 400 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(
    page.getByRole("heading", { name: "Lost in the sound" }),
  ).toBeVisible();
  await context.close();
});
