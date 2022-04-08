import subprocess
import os 

script_status = 0
has_dist = os.path.exists(os.path.join(os.getcwd(), 'lib'))
has_quickstart = os.path.exists(os.path.join(os.getcwd(), 'views'))

if( has_quickstart ):
    print('Deleting Quickstart..')
    remove_quickstart = subprocess.run('rm -rf views', shell=True)
    script_status = remove_dist.returncode

if( has_dist ):
    print('Deleting Old..')
    remove_dist = subprocess.run('rm -rf lib', shell=True)
    script_status = remove_dist.returncode


if( script_status == 0 ):
    print('Rebuilding..')
    build_semver = subprocess.run('yarn build && yarn docs', shell=True)
    script_status = build_semver.returncode

if(script_status == 0):
    print('Updating Deps..')
    update_examples = subprocess.run('git submodule update --remote', shell=True)
    script_status = update_examples.returncode

if(script_status == 0):
    print('Running Tests..')
    test_job0 = subprocess.run('yarn test', shell=True)
    script_status = test_job0.returncode


print('Status: ', script_status)
