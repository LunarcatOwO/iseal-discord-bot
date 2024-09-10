// MIT License

// Copyright (c) 2024 LunarcatOwO

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
export async function getLatestReleaseAsset(owner, repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    );
    const release = await response.json();
    const asset = release.assets[0]; // Assuming you want the first asset
    downloadUrl = asset.browser_download_url;
    console.log(downloadUrl);
    if (repo === "Powergems") {
      console.log("Plugin is Powergems, giving modrinth download link...");
      downloadUrl =
        "https://modrinth.com/plugin/powergems";
      return downloadUrl;
    } else {
      return downloadUrl
    }
  } catch (error) {
    console.error("Error fetching release data:", error);
    console.log("Giving user Default spigot download link...");
    let downloadUrl;
    if (repo === "Powergems") {
      downloadUrl =
        "https://modrinth.com/plugin/powergems";
    } else if (repo == "OrePowers") {
      downloadUrl = "https://www.spigotmc.org/resources/orepowers.113941/";
    } else if (repo == "Valocraft") {
      downloadUrl =
        "https://www.spigotmc.org/resources/1-19-4-1-20-x-valocraft.115131/";
    } else if (repo == "ParkourProject") {
      downloadUrl =
        "https://www.spigotmc.org/resources/1-20-x-1-19-4-parkourproject.115478/";
    }
    console.log(downloadUrl);
    return downloadUrl;
  }
}
export async function getLatestPreReleaseAsset(owner, repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`
    );
    const releases = await response.json();
    const preReleases = releases.filter((release) => release.prerelease);
    const latestPreRelease = preReleases[0]; // Assuming the first one is the latest
    const asset = latestPreRelease.assets[0]; // Assuming you want the first asset
    const downloadUrl = asset.browser_download_url;
    console.log(downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("Error fetching release data:", error);
    console.log("Giving user Default spigot download link...");
    let downloadUrl;
    if (repo === "Powergems") {
      downloadUrl =
        "https://spigotmc.org/resources/1-19-4-1-20-x-powergems.108943/";
    } else if (repo == "OrePowers") {
      downloadUrl = "https://www.spigotmc.org/resources/orepowers.113941/";
    } else if (repo == "Valocraft") {
      downloadUrl =
        "https://www.spigotmc.org/resources/1-19-4-1-20-x-valocraft.115131/";
    } else if (repo == "ParkourProject") {
      downloadUrl =
        "https://www.spigotmc.org/resources/1-20-x-1-19-4-parkourproject.115478/";
    }
    console.log(downloadUrl);
    return downloadUrl;
  }
}
