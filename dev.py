import json
import os
import webbrowser

def publish_package():
    package_path = "."
    package_name = "@zegocloud/zimkit-rn"
    # 组合当前脚本路径及 package_path
    packagejson_file_path = os.path.join(os.getcwd(), package_path, "package.json")
    # 将 package.json 文件拷贝一份为 package.json.back
    os.system("cp " + packagejson_file_path + " " + packagejson_file_path + ".back")
    # 读取 package.json 文件并删除其中的 react-native,source,files.src节点
    packagejson_obj = {}
    with open(packagejson_file_path, "r") as f:
        packagejson_content = f.read()
        packagejson_obj = json.loads(packagejson_content)
        del packagejson_obj["react-native"]
        del packagejson_obj["source"]
        print(packagejson_obj["files"])
        packagejson_obj["files"].remove("src")
    print("\nPreparing package.json for publishing...\n")
    is_beta = input("Is this a beta release? (y/n)[y by default]: ").lower() != 'n'
    current_version = packagejson_obj["version"]
    print("Current version: " + current_version)
    new_version = input("Enter new version:")
    # 如果 is_beta 为 True，且new_version不包含beta字符串，则在new_version结尾添加 -beta
    if is_beta and not "beta" in new_version:
        new_version = new_version + "-beta"
    print("New version: " + new_version)
    packagejson_obj["version"] = new_version
    # 将 packagejson_obj 写入 package.json 文件
    with open(packagejson_file_path, "w") as f:
        f.write(json.dumps(packagejson_obj, indent=4))
        f.close()

    print("\nPublishing package.json...\n")
    if is_beta:
        os.system("cd " + package_path + "; npm publish --tag beta --access public")
    else:
        os.system("cd " + package_path + "; npm publish --access public")
    os.system("mv " + packagejson_file_path + ".back " + packagejson_file_path)
    webbrowser.open("https://www.npmjs.com/package/" + package_name + "?activeTab=versions")
    print("Done")

# 定义 __main__ 方法
if __name__ == "__main__":
    publish_package()
    print("Done")