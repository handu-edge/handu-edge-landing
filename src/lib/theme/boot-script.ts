import { themeConfig } from "@/config/theme";
import { typographyConfig } from "@/config/typography";

export function createThemeBootScript(): string {
  const payload = {
    modes: themeConfig.modes.map((mode) => mode.id),
    accents: Object.keys(themeConfig.accents),
    fonts: Object.keys(typographyConfig.fonts),
    defaultMode: themeConfig.defaultMode,
    defaultAccent: themeConfig.defaultAccent,
    defaultFont: typographyConfig.defaultFont,
    radius: themeConfig.radius,
    keys: themeConfig.storageKeys,
  };

  return `(function(){try{var c=${JSON.stringify(payload)};var r=document.documentElement;var mode=localStorage.getItem(c.keys.mode)||c.defaultMode;if(c.modes.indexOf(mode)<0)mode=c.defaultMode;var accent=localStorage.getItem(c.keys.accent)||c.defaultAccent;if(c.accents.indexOf(accent)<0)accent=c.defaultAccent;var font=localStorage.getItem(c.keys.font)||c.defaultFont;if(c.fonts.indexOf(font)<0)font=c.defaultFont;var dark=mode==="dark"||(mode==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);r.classList.toggle("dark",dark);r.setAttribute("data-mode",mode);r.setAttribute("data-accent",accent);r.setAttribute("data-font",font);r.setAttribute("data-radius",c.radius);}catch(e){}})();`;
}
