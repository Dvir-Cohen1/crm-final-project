import { readdirSync, Dirent } from "fs";
import { join } from "path";
import { ReactNode } from "react";
import { NextApiRequest, NextApiResponse } from "next";

interface MenuItem {
  label: string | ReactNode;
  key: string;
  href?: string;
  icon?: ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
  type?: "item" | "group";
}

function generateMenuData(): MenuItem[] {
  const pagesDir = join(process.cwd(), "src/pages");

  const files: string[] = readdirSync(pagesDir).filter(
    (file) => file.endsWith(".tsx") || file.endsWith(".jsx")
  );

  const menuData: MenuItem[] = files.map((file) => {
    const path = "/" + file.replace(/\.(jsx|tsx)$/, "");
    const label = path === "/" ? "Home" : path.slice(1);

    return {
      label,
      key: label.toLowerCase(),
      href: path,
    };
  });

  const subdirectories: string[] = readdirSync(pagesDir, {
    withFileTypes: true,
  })
    .filter((dirent: Dirent) => dirent.isDirectory())
    .map((dirent: Dirent) => dirent.name);

  subdirectories.forEach((directory) => {
    const subdirectoryPath = join(pagesDir, directory);

    const subdirectoryFiles = readdirSync(subdirectoryPath).filter(
      (file) => file.endsWith(".tsx") || file.endsWith(".jsx")
    );

    const submenuItems = subdirectoryFiles.map((file) => {
      const path = `/${directory}/${file.replace(/\.(jsx|tsx)$/, "")}`;
      const label = file.replace(/\.(jsx|tsx)$/, "");

      return {
        label,
        key: label.toLowerCase(),
        href: path,
      };
    });

    if (submenuItems.length > 0) {
      menuData.push({
        label: directory,
        key: directory.toLowerCase(),
        icon: "",
        children: submenuItems,
      });
    }
  });

  return menuData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const navList = generateMenuData();
  res.status(200).json({ navList });
}
