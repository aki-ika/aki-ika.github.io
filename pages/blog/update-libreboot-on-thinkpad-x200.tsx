import { Blog } from "@/components/blog";

const markdownString = `
# ThinkPad X200のLibrebootをLibreboot 20231106にアップデートする

## 1. 背景
ThinkPad X200を購入してLibrebootを導入し、Libreboot側のgrub.cfgをいじった結果、起動しなくなり、戻せなくなってしまったので長い間放置していた。

最近、たまたまブラウザの昔の履歴がサジェストされたのを踏み間違えて開いたところ、アップデートがかなり進んでいることに気づいた。

存在を思い出して再度アップデートし、Ubuntuを再インストールしたらgrub.cfgが書き変わり、起動するようになったので、おもちゃがわりにしていた。

今回、そのアップデートからさらに20231106にバージョンをあげたが、前回のアップデート時と手順は変わっていないので、まるで古いLibrebootからはじめてアップデートするかのように、八百長的にメモしておく。
## 2. 手順
環境は以下の通り。
\`\`\`shell
$ cat /etc/os-release 
PRETTY_NAME="Ubuntu 22.04.3 LTS" 
NAME="Ubuntu" VERSION_ID="22.04" 
VERSION="22.04.3 LTS (Jammy Jellyfish)" 
VERSION_CODENAME=jammy 
ID=ubuntu 
ID_LIKE=debian 
HOME_URL="https://www.ubuntu.com/" 
SUPPORT_URL="https://help.ubuntu.com/" 
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/" 
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy" 
UBUNTU_CODENAME=jammy
\`\`\`

flashromが入っていることを確認する。8MBのROMを使ってることがわかる。あとで対象のromの名前を探す時に使う。

\`\`\`shell
$ sudo flashrom -p internal 
[sudo] user のパスワード: 
flashrom v1.2 on Linux 6.2.0-36-generic (x86_64) 
flashrom is free software, get the source code at https://flashrom.org

Using clock_gettime for delay loops (clk_id: 1, resolution: 1ns). 
coreboot table found at 0x7f772000. 
Found chipset "Intel ICH9M-E". 
Enabling flash write... OK.
Found Winbond flash chip "W25X64" (8192 kB, SPI) mapped at physical address 0x00000000ff800000. 
No operations were specified.
\`\`\`

バックアップをとる。 
\`\`\`shell
$ sudo flashrom -p internal:laptop=force_I_want_a_brick,boardmismatch=force -r dump.bin 
flashrom v1.2 on Linux 6.2.0-36-generic (x86_64) 
flashrom is free software, get the source code at https://flashrom.org

Using clock_gettime for delay loops (clk_id: 1, resolution: 1ns). 
coreboot table found at 0x7f772000. 
Found chipset "Intel ICH9M-E". 
Enabling flash write... OK. 
Found Winbond flash chip "W25X64" (8192 kB, SPI) mapped at physical address 0x00000000ff800000. 
Reading flash... done.
\`\`\`

アップデートするLibreboot 20231106をダウンロードする。
\`\`\`shell
$ wget https://www.mirrorservice.org/sites/libreboot.org/release/testing/20231106/roms/libreboot-20231106_x200_8mb.tar.xz
$ wget https://www.mirrorservice.org/sites/libreboot.org/release/testing/20231106/roms/libreboot-20231106_x200_8mb.tar.xz.sha512 
$ sha512sum -c libreboot-20231106_x200_8mb.tar.xz.sha512 libreboot-20231106_x200_8mb.tar.xz: OK
\`\`\`

展開して、対象のromの名前を変更する。今回はusqwertyのromを使う。
\`\`\`shell
$ tar xvf libreboot-20231106_x200_8mb.tar.xz 
$ cd bin/x200_8mb/ 
$ mv grub_x200_8mb_libgfxinit_corebootfb_usqwerty_noblobs_nomicrocode.rom libreboot.rom
\`\`\`

アップデートする。1,2分くらいまつと完了する。
\`\`\`shell
$ sudo flashrom -p internal:laptop=force_I_want_a_brick,boardmismatch=force -w libreboot.rom 
flashrom v1.2 on Linux 6.2.0-36-generic (x86_64) 
flashrom is free software, get the source code at https://flashrom.org

Using clock_gettime for delay loops (clk_id: 1, resolution: 1ns). 
coreboot table found at 0x7f772000. 
Found chipset "Intel ICH9M-E". 
Enabling flash write... OK. 
Found Winbond flash chip "W25X64" (8192 kB, SPI) mapped at physical address 0x00000000ff800000. 
Reading old flash chip contents... done. 
Erasing and writing flash chip... 
Erase/write done. 
Verifying flash... VERIFIED.
\`\`\`

再起動する。grubの画面が表示された後、escキーを押すと起動する。
UbuntuのLiveUSBでインストールして/bootパーティションがあるからなのかはわからない。

またGentooを入れてみて、そのときはちゃんとパーティション切って暗号化までやってみる。
`;

const UpdateLibreboot = () => {
  return <Blog content={markdownString} />;
};

export default UpdateLibreboot;
