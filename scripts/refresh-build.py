import subprocess
import os

script_status = 0
has_modules = os.path.exists(os.path.join(os.getcwd(), 'node_modules'))
has_dist = os.path.exists(os.path.join(os.getcwd(), 'lib'))
has_quickstart = os.path.exists(os.path.join(os.getcwd(), 'views'))

if(has_modules):
    print('Deleting node_modules..')
    script_status = subprocess.run('rm -rf node_modules', shell=True).returncode

print('Reinstalling...')
script_status = subprocess.run('yarn', shell=True).returncode

if(has_quickstart):
    print('Deleting Quickstart..')
    script_status = subprocess.run('rm -rf views', shell=True).returncode

if(has_dist):
    print('Deleting Old..')
    script_status = subprocess.run('rm -rf lib', shell=True).returncode

if(script_status == 0):
    print('Rebuilding..')
    script_status = subprocess.run('yarn build && yarn docs', shell=True).returncode

if(script_status == 0):
    print('Updating Deps..')
    script_status = subprocess.run('git submodule update --remote', shell=True).returncode

if(script_status == 0):
    print('Running Tests..')
    script_status = subprocess.run('yarn test', shell=True).returncode


print('Status: ', script_status)
