export class Utilities {
    public static async animate(el: HTMLElement, animation: string): Promise<void> {
        const end = () => new Promise((resolve) => el.addEventListener(this.animationEnd, resolve, { once: true }));

        el.classList.add("animated");
        el.classList.add("faster");
        el.classList.add(animation);

        await end();

        el.classList.remove("animated");
        el.classList.remove(animation);

    }

    /**
     * Get the current supported animation end event.
     */
    public static get animationEnd(): string {
        const fakeEl = document.createElement("fakeelement");

        const animations = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "mozAnimationEnd",
            WebkitAnimation: "webkitAnimationEnd",
        };

        for (const t in animations)
            if (fakeEl.style[t] !== undefined)
                return animations[t];
    }

}