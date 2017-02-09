[![Build Status](https://travis-ci.org/CountJr/project-lvl2-s13.svg?branch=master)](https://travis-ci.org/CountJr/project-lvl2-s13) [![Code Climate](https://codeclimate.com/github/CountJr/project-lvl2-s13/badges/gpa.svg)](https://codeclimate.com/github/CountJr/project-lvl2-s13) [![Test Coverage](https://codeclimate.com/github/CountJr/project-lvl2-s13/badges/coverage.svg)](https://codeclimate.com/github/CountJr/project-lvl2-s13/coverage) [![Issue Count](https://codeclimate.com/github/CountJr/project-lvl2-s13/badges/issue_count.svg)](https://codeclimate.com/github/CountJr/project-lvl2-s13)


# Config comparation 

Compare and reports the difference of 2 config files in json, yaml or ini formats.

## Local usage
```
npm install config-compare-light
```

## Global usage
```
npm install -g config-compare-light

gendiff first.file second.file [-f format]
```

where format: `standart, plain or json`

## API

### compare from files
```
import { diffFromFiles } from 'config-compare-light';

diffFromFiles(first.file.path, second.file.path [, format]);
```

### compare from strings
```
import diffFromStrings from 'config-compare-light';

diffFromStrings(first.file.string, second.file.string, first.file.format, second.file.format [, format]);
```
