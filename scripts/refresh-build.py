import subprocess
import os 

script_status = 0
has_dist = os.path.exists(os.path.join( os.getcwd(), 'dist'))

if( has_dist ):
    remove_dist = subprocess.run('rm -rf dist', shell=True)
    script_status = remove_dist.returncode

if( script_status == 0 ):
    build_semver = subprocess.run('yarn build && yarn docs', shell=True)
    script_status = build_semver.returncode

if( script_status == 0 ):
    update_examples = subprocess.run('git submodule update --remote')
    script_status = update_examples.returncode