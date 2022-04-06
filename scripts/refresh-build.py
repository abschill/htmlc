import subprocess
import os 

script_status = 0
has_dist = os.path.exists(os.path.join(os.getcwd(), 'dist'))

print('Deleting Old..')
if( has_dist ):
    remove_dist = subprocess.run('rm -rf dist', shell=True)
    script_status = remove_dist.returncode

print('Rebuilding..')
if( script_status == 0 ):
    build_semver = subprocess.run('yarn build && yarn docs', shell=True)
    script_status = build_semver.returncode

print('Updating Deps..')
if(script_status == 0):
    update_examples = subprocess.run('git submodule update --remote', shell=True)
    script_status = update_examples.returncode

print('Running Tests..')
if(script_status == 0):
    test_job0 = subprocess.run('yarn test', shell=True)
    script_status = test_job0.returncode
    test_job1 = subprocess.run('yarn test:ssg', shell=True)
    if test_job1.returncode == 0:
        if os.path.exists(os.path.join(os.getcwd(), '../public')):
            script_status = 0
        else:
            script_status = 1

print('Status: ', script_status)
