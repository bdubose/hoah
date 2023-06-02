param(
    [Parameter()]
    [String]$file
)

$env:PGUSER = 'hoah'
$env:PGPASSWORD = 'hoah'

if ($file -eq '') {
    psql 
} else {
    psql -f $file
}
